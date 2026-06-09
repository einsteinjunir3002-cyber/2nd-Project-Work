import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import User from '../models/User';
import Course from '../models/Course';
import Note from '../models/Note';
import Submission from '../models/Submission';
import Consultation from '../models/Consultation';
import SystemSetting from '../models/SystemSetting';
import { AiService } from '../services/aiService';

// 1. Get all users for administration dashboard
export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  const { query, role } = req.query;

  try {
    const filter: any = {};
    
    if (role) {
      filter.role = role as string;
    }

    if (query) {
      const searchRegex = new RegExp(query as string, 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { studentIdNumber: searchRegex }
      ];
    }

    const users = await User.find(filter).sort({ name: 1 });
    const mapped = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      isSuspended: u.isSuspended,
      department: u.department,
      studentIdNumber: u.studentIdNumber,
      title: u.title,
      office: u.office,
      createdAt: u.createdAt,
    }));

    return res.status(200).json(mapped);
  } catch (err) {
    console.error('Admin getUsers error:', err);
    return res.status(500).json({ message: 'Internal server error listing users.' });
  }
};

// 2. Suspend/Restore accounts
export const suspendUser = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, suspend } = req.body;

  if (!userId || suspend === undefined) {
    return res.status(400).json({ message: 'User ID and suspend flag (boolean) are required.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.role === 'admin' && suspend) {
      return res.status(400).json({ message: 'Cannot suspend an administrator account.' });
    }

    user.isSuspended = !!suspend;
    await user.save();

    return res.status(200).json({ 
      message: `User account has been successfully ${suspend ? 'suspended' : 'restored'}.`,
      user: {
        id: user._id.toString(),
        name: user.name,
        isSuspended: user.isSuspended
      }
    });
  } catch (err) {
    console.error('Admin suspendUser error:', err);
    return res.status(500).json({ message: 'Internal server error updating user account status.' });
  }
};

// 3. Platform aggregates dashboard statistics
export const getPlatformStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalLecturers = await User.countDocuments({ role: 'lecturer' });
    const totalCourses = await Course.countDocuments();
    const totalNotes = await Note.countDocuments();
    const totalSubmissions = await Submission.countDocuments();
    const totalConsultations = await Consultation.countDocuments();

    // Cumulative GPA average of all students
    const studentGrades = await User.find({ role: 'student' }).select('projectedGpa');
    const validGpas = studentGrades.map(s => s.projectedGpa || 4.0);
    const averageGpa = validGpas.length 
      ? parseFloat((validGpas.reduce((a, b) => a + b, 0) / validGpas.length).toFixed(2)) 
      : 4.0;

    // AI Stats from System Settings
    const settings = await AiService.getSettings();

    return res.status(200).json({
      studentsCount: totalStudents,
      lecturersCount: totalLecturers,
      coursesCount: totalCourses,
      notesCount: totalNotes,
      submissionsCount: totalSubmissions,
      consultationsCount: totalConsultations,
      averageGpa,
      apiUsageStats: settings.apiUsageStats,
    });
  } catch (err) {
    console.error('Admin getPlatformStats error:', err);
    return res.status(500).json({ message: 'Internal server error aggregating statistics.' });
  }
};

// 4. Retrieve Site Settings
export const getSiteSettings = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const settings = await AiService.getSettings();
    return res.status(200).json(settings);
  } catch (err) {
    console.error('Admin getSiteSettings error:', err);
    return res.status(500).json({ message: 'Internal server error fetching site configurations.' });
  }
};

// 5. Site configuration AI parameters
export const updateSiteSettings = async (req: AuthenticatedRequest, res: Response) => {
  const { 
    siteName, 
    activeAiProvider, 
    activeAiModel,
    geminiApiKey,
    openaiApiKey,
    openrouterApiKey,
    groqApiKey,
    togetherApiKey
  } = req.body;

  try {
    const settings = await AiService.getSettings();

    if (siteName) settings.siteName = siteName;
    if (activeAiProvider) settings.activeAiProvider = activeAiProvider;
    if (activeAiModel) settings.activeAiModel = activeAiModel;

    // Save actual key only if not sending masked version back
    if (geminiApiKey && !geminiApiKey.endsWith('...')) {
      settings.geminiApiKey = geminiApiKey;
    }
    if (openaiApiKey && !openaiApiKey.endsWith('...')) {
      settings.openaiApiKey = openaiApiKey;
    }
    if (openrouterApiKey && !openrouterApiKey.endsWith('...')) {
      settings.openrouterApiKey = openrouterApiKey;
    }
    if (groqApiKey && !groqApiKey.endsWith('...')) {
      settings.groqApiKey = groqApiKey;
    }
    if (togetherApiKey && !togetherApiKey.endsWith('...')) {
      settings.togetherApiKey = togetherApiKey;
    }

    await settings.save();

    return res.status(200).json({
      message: 'System settings saved successfully!',
      settings,
    });
  } catch (err) {
    console.error('Admin updateSiteSettings error:', err);
    return res.status(500).json({ message: 'Internal server error updating settings.' });
  }
};

// 6. Test AI Connection
export const testAiConnection = async (req: AuthenticatedRequest, res: Response) => {
  const { provider, apiKey, modelName } = req.body;

  if (!provider) {
    return res.status(400).json({ message: 'Provider is required.' });
  }

  try {
    let keyToUse = apiKey;
    
    // Resolve key from DB if it is masked or empty
    if (!keyToUse || keyToUse.endsWith('...')) {
      const settings = await AiService.getSettings();
      keyToUse = AiService.getApiKey(settings, provider);
    }

    if (!keyToUse) {
      return res.status(400).json({ message: `No API key found or configured for provider "${provider}".` });
    }

    console.log(`🔌 Testing connectivity for AI provider "${provider}"...`);
    const isConnected = await AiService.testConnection(provider, keyToUse, modelName);

    if (isConnected) {
      return res.status(200).json({ success: true, message: `Successfully connected to "${provider}" AI provider!` });
    } else {
      return res.status(400).json({ success: false, message: `Failed to authenticate connection with "${provider}" provider.` });
    }
  } catch (err: any) {
    console.error('testAiConnection error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Error executing connection test.' });
  }
};
