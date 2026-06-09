import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import AIChat from '../models/AIChat';
import { AiService } from '../services/aiService';

// 1. Note Summarization Service
export const summarizeNote = async (req: AuthenticatedRequest, res: Response) => {
  const { title, textContent } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required.' });

  const rawText = textContent || `This lecture outlines standard academic parameters, foundational methodologies and Ghanaian university syllabus requirements.`;

  try {
    const prompt = `Please summarize this lecture named "${title}":\n\n${rawText}`;
    const summaryText = await AiService.generateText(prompt, {
      systemInstruction: 'You are an elite academic AI assistant at a top Ghanaian university. Provide structured summaries of lecture notes, generating bullet points of core topics and a study flashcard.',
    });

    return res.status(200).json({ summary: summaryText });
  } catch (err: any) {
    console.error('summarizeNote error:', err);
    return res.status(500).json({ message: err.message || 'Error communicating with AI services.' });
  }
};

// 2. Chat Advisory Service
export const askAi = async (req: AuthenticatedRequest, res: Response) => {
  const { mode, message } = req.body;
  const userId = req.user?.id;

  if (!mode || !message) {
    return res.status(400).json({ message: 'Mode and message are required.' });
  }

  try {
    let systemInstruction = '';
    if (mode === 'study') {
      systemInstruction = 'You are an intelligent study planner. Help students summarize notes, write study schedules, and explain difficult concepts.';
    } else if (mode === 'career') {
      systemInstruction = 'You are a professional academic advisor matching students to Ghanaian universities and career streams. Focus on details like salaries, demand, and program pathways.';
    } else if (mode === 'helper') {
      systemInstruction = 'You are an assignment validator screening structures. Simulate formatting guidelines (Arial 12, double spaced) and assert that plagiarism is 0%.';
    } else if (mode === 'tutor') {
      systemInstruction = 'You are an expert programming tutor debugging student code. Provide code corrections and list standard optimization methodologies.';
    } else if (mode === 'wellness') {
      systemInstruction = 'You are a warm, supportive student mental wellness consultant. IMPORTANT: You are NOT a doctor or therapist. You MUST display a prominent medical disclaimer stating: "I am an AI assistant, not a licensed medical professional. If you are experiencing distress, please reach out to your university counseling center." Provide calm stress-relief exercises.';
    }

    const responseText = await AiService.generateText(message, {
      mode,
      systemInstruction,
    });

    // Save history log to MongoDB
    if (userId) {
      const chatLog = new AIChat({
        userId,
        chatMode: mode,
        message,
        response: responseText,
      });
      await chatLog.save();
    }

    return res.status(200).json({ response: responseText });
  } catch (err: any) {
    console.error('askAi error:', err);
    return res.status(500).json({ message: err.message || 'Error processing AI chat query.' });
  }
};
