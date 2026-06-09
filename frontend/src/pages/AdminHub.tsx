import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppState } from '../context/AppStateContext';
import { 
  Users, 
  Settings, 
  UserX, 
  UserCheck, 
  Search, 
  Sliders, 
  Cpu, 
  TrendingUp, 
  BookOpen, 
  FileCheck, 
  Video,
  KeyRound,
  ShieldCheck,
  Loader2,
  Trash2,
  Play,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminHub: React.FC = () => {
  const { currentAdminTab, addSystemNotification } = useAppState();

  // 1. Users list state
  const [usersList, setUsersList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  // 2. Stats state
  const [stats, setStats] = useState<any>({
    studentsCount: 0,
    lecturersCount: 0,
    coursesCount: 0,
    notesCount: 0,
    submissionsCount: 0,
    consultationsCount: 0,
    averageGpa: 4.0,
    apiUsageStats: {
      gemini: { requests: 0, errors: 0 },
      openai: { requests: 0, errors: 0 },
      openrouter: { requests: 0, errors: 0 },
      groq: { requests: 0, errors: 0 },
      together: { requests: 0, errors: 0 },
    }
  });
  const [loadingStats, setLoadingStats] = useState(false);

  // 3. Configuration settings state
  const [siteName, setSiteName] = useState('SmartLearn AI');
  const [activeProvider, setActiveProvider] = useState<'gemini' | 'openai' | 'openrouter' | 'groq' | 'together'>('gemini');
  const [activeModel, setActiveModel] = useState('gemini-2.5-flash');
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [openrouterKey, setOpenrouterKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [togetherKey, setTogetherKey] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);

  // Premium Notifications Banner State
  const [uiNotification, setUiNotification] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const triggerUiNotification = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setUiNotification({ text, type });
    // Auto clear after 4 seconds
    setTimeout(() => {
      setUiNotification(null);
    }, 4000);
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      let url = `/api/admin/users?query=${searchQuery}`;
      if (roleFilter) url += `&role=${roleFilter}`;
      const response = await axios.get(url);
      setUsersList(response.data);
    } catch (err) {
      console.error('Error fetching admin users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/admin/settings');
      const data = response.data;
      setSiteName(data.siteName || 'SmartLearn AI');
      setActiveProvider(data.activeAiProvider || 'gemini');
      setActiveModel(data.activeAiModel || 'gemini-2.5-flash');
      setGeminiKey(data.geminiApiKey || '');
      setOpenaiKey(data.openaiApiKey || '');
      setOpenrouterKey(data.openrouterApiKey || '');
      setGroqKey(data.groqApiKey || '');
      setTogetherKey(data.togetherApiKey || '');
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  useEffect(() => {
    if (currentAdminTab === 'admin-users') {
      fetchUsers();
    } else if (currentAdminTab === 'admin-stats') {
      fetchStats();
    } else if (currentAdminTab === 'admin-settings') {
      fetchSettings();
    }
  }, [currentAdminTab, roleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleToggleSuspension = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await axios.post('/api/admin/users/suspend', {
        userId,
        suspend: !currentStatus
      });
      triggerUiNotification(response.data.message, 'success');
      addSystemNotification(response.data.message);
      fetchUsers();
    } catch (err: any) {
      triggerUiNotification(err.response?.data?.message || 'Error updating user status.', 'error');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const response = await axios.post('/api/admin/settings', {
        siteName,
        activeAiProvider: activeProvider,
        activeAiModel: activeModel,
        geminiApiKey: geminiKey,
        openaiApiKey: openaiKey,
        openrouterApiKey: openrouterKey,
        groqApiKey: groqKey,
        togetherApiKey: togetherKey,
      });
      triggerUiNotification(response.data.message, 'success');
      addSystemNotification('AI system configurations updated successfully.');
      fetchSettings(); // Reload settings with updated masked keys
    } catch (err: any) {
      triggerUiNotification(err.response?.data?.message || 'Error saving configurations.', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleTestConnection = async (provider: 'gemini' | 'openai' | 'openrouter' | 'groq' | 'together') => {
    setTestingConnection(provider);
    
    let apiKey = '';
    if (provider === 'gemini') apiKey = geminiKey;
    else if (provider === 'openai') apiKey = openaiKey;
    else if (provider === 'openrouter') apiKey = openrouterKey;
    else if (provider === 'groq') apiKey = groqKey;
    else if (provider === 'together') apiKey = togetherKey;

    try {
      const response = await axios.post('/api/admin/ai/test', {
        provider,
        apiKey,
      });
      if (response.data.success) {
        triggerUiNotification(response.data.message, 'success');
      } else {
        triggerUiNotification(response.data.message, 'error');
      }
    } catch (err: any) {
      triggerUiNotification(err.response?.data?.message || `Failed to connect to provider "${provider}".`, 'error');
    } finally {
      setTestingConnection(null);
    }
  };

  const handleRemoveKey = (provider: 'gemini' | 'openai' | 'openrouter' | 'groq' | 'together') => {
    if (provider === 'gemini') setGeminiKey('');
    else if (provider === 'openai') setOpenaiKey('');
    else if (provider === 'openrouter') setOpenrouterKey('');
    else if (provider === 'groq') setGroqKey('');
    else if (provider === 'together') setTogetherKey('');
    
    triggerUiNotification(`API Key for ${provider} cleared in client layout. Hit "Save System Settings" to apply.`, 'info');
  };

  // Helper to get total stats for rendering
  const totalRequests = stats.apiUsageStats
    ? Object.values(stats.apiUsageStats).reduce((acc: number, curr: any) => acc + (curr.requests || 0), 0)
    : 0;

  return (
    <div className="flex-grow p-8 overflow-y-auto max-h-screen relative">
      
      {/* Floating System Notifications Banner */}
      <AnimatePresence>
        {uiNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl shadow-xl border glass max-w-sm ${
              uiNotification.type === 'success' 
                ? 'border-emerald-500/30 bg-emerald-950/70 text-emerald-300' 
                : uiNotification.type === 'error'
                ? 'border-red-500/30 bg-red-950/70 text-red-300'
                : 'border-blue-500/30 bg-blue-950/70 text-blue-300'
            }`}
          >
            {uiNotification.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
            {uiNotification.type === 'error' && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {uiNotification.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <span className="text-xs font-bold leading-tight">{uiNotification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header portal title block */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-violet-500 font-bold text-xs uppercase tracking-wider">System Administration</span>
          <h2 className="text-2xl font-black font-sans mt-1">Admin Management Desk</h2>
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 uppercase bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Core Root Access
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* USERS MANAGER VIEW */}
        {currentAdminTab === 'admin-users' && (
          <motion.div 
            key="users"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            {/* Search Filter bar */}
            <div className="glass p-5 flex flex-wrap gap-4 items-center justify-between">
              <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by name, email, student ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800/60 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-all font-semibold"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl cursor-pointer">
                  Search
                </button>
              </form>

              <div className="flex gap-2">
                <button 
                  onClick={() => setRoleFilter('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${roleFilter === '' ? 'bg-violet-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  All Roles
                </button>
                <button 
                  onClick={() => setRoleFilter('student')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${roleFilter === 'student' ? 'bg-violet-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Students
                </button>
                <button 
                  onClick={() => setRoleFilter('lecturer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${roleFilter === 'lecturer' ? 'bg-violet-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Faculty
                </button>
              </div>
            </div>

            {/* Users grid table */}
            <div className="glass p-6">
              <h3 className="font-extrabold text-sm mb-4">Registered Accounts</h3>
              
              {loadingUsers ? (
                <div className="flex items-center justify-center py-12 gap-2 text-slate-400 text-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-violet-500" />
                  Loading accounts catalog...
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-semibold border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 font-black text-[9px] uppercase tracking-wider bg-slate-950/40">
                        <th className="p-4 rounded-tl-xl">User details</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Department / Metadata</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 rounded-tr-xl text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((usr) => (
                        <tr key={usr.id} className="border-b border-slate-800/40 hover:bg-slate-900/10 transition-colors">
                          <td className="p-4">
                            <h4 className="font-black text-slate-200">{usr.name}</h4>
                            <span className="text-[10px] text-slate-400">{usr.email}</span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${usr.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400' : usr.role === 'lecturer' ? 'bg-amber-500/10 text-amber-400' : 'bg-violet-500/10 text-violet-400'}`}>
                               {usr.role}
                            </span>
                          </td>
                          <td className="p-4 text-slate-400">
                            {usr.role === 'student' ? (
                              <span>Dept: {usr.department || 'CS'} • ID: {usr.studentIdNumber || 'N/A'}</span>
                            ) : usr.role === 'lecturer' ? (
                              <span>Dept: {usr.department || 'CS'} • Office: {usr.office || 'N/A'}</span>
                            ) : (
                              <span>Platform Administrator</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${usr.isSuspended ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                              {usr.isSuspended ? 'Suspended' : 'Active'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {usr.role !== 'admin' && (
                              <button
                                onClick={() => handleToggleSuspension(usr.id, usr.isSuspended)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wide cursor-pointer transition-all flex items-center gap-1.5 ml-auto ${usr.isSuspended ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-red-950/40 border border-red-500/20 hover:bg-red-600 hover:text-white text-red-400'}`}
                              >
                                {usr.isSuspended ? (
                                  <>
                                    <UserCheck className="w-3.5 h-3.5" /> Restore Account
                                  </>
                                ) : (
                                  <>
                                    <UserX className="w-3.5 h-3.5" /> Suspend Account
                                  </>
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {usersList.length === 0 && (
                    <p className="text-center text-slate-500 py-8">No users found matching query criteria.</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ANALYTICS STATS VIEW */}
        {currentAdminTab === 'admin-stats' && (
          <motion.div 
            key="stats"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            {/* Metric widgets row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Students</span>
                  <h4 className="text-2xl font-black mt-1">{stats.studentsCount}</h4>
                </div>
                <Users className="w-7 h-7 text-violet-500 opacity-60" />
              </div>
              <div className="glass p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Lecturers</span>
                  <h4 className="text-2xl font-black mt-1">{stats.lecturersCount}</h4>
                </div>
                <Sliders className="w-7 h-7 text-amber-500 opacity-60" />
              </div>
              <div className="glass p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Active Courses</span>
                  <h4 className="text-2xl font-black mt-1">{stats.coursesCount}</h4>
                </div>
                <BookOpen className="w-7 h-7 text-emerald-500 opacity-60" />
              </div>
              <div className="glass p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Global Student GPA</span>
                  <h4 className="text-2xl font-black mt-1">{stats.averageGpa}</h4>
                </div>
                <TrendingUp className="w-7 h-7 text-sky-500 opacity-60" />
              </div>
            </div>

            {/* Aggregated details panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6">
                <h3 className="font-extrabold text-sm mb-4">Academic Output Log</h3>
                
                <div className="flex flex-col gap-4 text-xs font-semibold">
                  <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
                    <span className="text-slate-400 flex items-center gap-2"><BookOpen className="w-4 h-4 text-violet-400" /> Lecture slides uploaded</span>
                    <span className="text-slate-200 font-bold">{stats.notesCount} Notes</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
                    <span className="text-slate-400 flex items-center gap-2"><FileCheck className="w-4 h-4 text-emerald-400" /> Finished Homework submissions</span>
                    <span className="text-slate-200 font-bold">{stats.submissionsCount} Files</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
                    <span className="text-slate-400 flex items-center gap-2"><Video className="w-4 h-4 text-sky-400" /> WebRTC Video consultations</span>
                    <span className="text-slate-200 font-bold">{stats.consultationsCount} Meetings</span>
                  </div>
                </div>
              </div>

              {/* AI Provider Usage Statistics */}
              <div className="glass p-6">
                <h3 className="font-extrabold text-sm mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
                  AI Providers API Statistics
                </h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold mb-4">
                  Dynamic routing aggregates and logs successful vs. failing requests quotas across fallback gateways.
                </p>

                {loadingStats ? (
                  <div className="flex justify-center items-center py-6 gap-2 text-xs text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin text-violet-500" /> Calculating quotas...
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {stats.apiUsageStats && Object.entries(stats.apiUsageStats).map(([provider, details]: [string, any]) => (
                      <div key={provider} className="flex flex-col gap-1 p-2.5 bg-slate-950/60 border border-slate-850 rounded-lg">
                        <div className="flex justify-between items-center text-xs">
                          <span className="capitalize font-black text-slate-300">{provider}</span>
                          <span className="text-[10px] text-slate-500 font-bold">
                            Total Calls: {details?.requests || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <div className="flex-grow bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                            <div 
                              className="bg-emerald-500 h-full" 
                              style={{ 
                                width: details?.requests + details?.errors > 0 
                                  ? `${(details.requests / (details.requests + details.errors)) * 100}%` 
                                  : '100%' 
                              }}
                            />
                            <div 
                              className="bg-red-500 h-full" 
                              style={{ 
                                width: details?.requests + details?.errors > 0 
                                  ? `${(details.errors / (details.requests + details.errors)) * 100}%` 
                                  : '0%' 
                              }}
                            />
                          </div>
                          <span className="text-[9px] font-bold text-emerald-400 shrink-0">
                            Success: {details?.requests || 0}
                          </span>
                          <span className="text-[9px] font-bold text-red-400 shrink-0">
                            Errors: {details?.errors || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="mt-2 text-center py-2 bg-slate-950 border border-slate-900 rounded-lg text-slate-300 text-xs font-black">
                      📊 Cumulative API Operations: {totalRequests}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* SETTINGS VIEW */}
        {currentAdminTab === 'admin-settings' && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-2xl mx-auto glass p-6"
          >
            <h3 className="font-extrabold text-sm mb-2 flex items-center gap-1.5 text-violet-400">
              <Settings className="w-4.5 h-4.5" />
              Configure System & AI Fallbacks
            </h3>
            <p className="text-[10px] text-slate-400 mb-6">
              Manage platform branding, define the active primary provider, configure failover API Keys, and test connection endpoints directly.
            </p>

            <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
              
              {/* branding & active providers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">LMS Platform Branding Title:</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800/60 rounded-xl text-xs text-slate-200 font-semibold focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Active Primary AI Provider:</label>
                  <select
                    value={activeProvider}
                    onChange={(e) => {
                      const prov = e.target.value as any;
                      setActiveProvider(prov);
                      // Switch to default model for selected provider automatically
                      if (prov === 'gemini') setActiveModel('gemini-2.5-flash');
                      else if (prov === 'openai') setActiveModel('gpt-4o-mini');
                      else if (prov === 'openrouter') setActiveModel('google/gemini-2.5-flash:free');
                      else if (prov === 'groq') setActiveModel('llama3-8b-8192');
                      else if (prov === 'together') setActiveModel('meta-llama/Llama-3-8b-chat-hf');
                    }}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800/60 rounded-xl text-xs text-slate-200 font-semibold focus:outline-none focus:border-violet-500 cursor-pointer"
                  >
                    <option value="gemini">Google Gemini API (Primary)</option>
                    <option value="openai">OpenAI API (Developer Direct)</option>
                    <option value="openrouter">OpenRouter Free Models</option>
                    <option value="groq">Groq Free Models (Llama-3)</option>
                    <option value="together">Together AI API (Fallback)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Primary AI Model Identifier:</label>
                <input
                  type="text"
                  value={activeModel}
                  onChange={(e) => setActiveModel(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800/60 rounded-xl text-xs text-slate-200 font-semibold focus:outline-none focus:border-violet-500"
                  placeholder="e.g. gemini-2.5-flash, gpt-4o-mini"
                  required
                />
              </div>

              {/* Divider */}
              <div className="border-t border-slate-850 my-2" />

              {/* API Keys Configuration Panel */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-violet-400" /> secure Fallback Provider Credentials
                </h4>
                <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">
                  Enter credentials below. Values ending with "..." indicate existing keys are securely encrypted at rest. To remove a key, clear the field or click the trash icon, then click save.
                </p>

                {/* 1. Google Gemini Key */}
                <div className="flex flex-col gap-1.5 p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                  <span className="text-[10px] font-extrabold text-slate-300">Google Gemini API Key:</span>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter Gemini API key..."
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="flex-grow p-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveKey('gemini')}
                      className="p-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900/40 text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Clear key input"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={testingConnection !== null}
                      onClick={() => handleTestConnection('gemini')}
                      className="px-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {testingConnection === 'gemini' ? <Loader2 className="w-3 h-3 animate-spin text-violet-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                      Test
                    </button>
                  </div>
                </div>

                {/* 2. OpenAI Key */}
                <div className="flex flex-col gap-1.5 p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                  <span className="text-[10px] font-extrabold text-slate-300">OpenAI API Key:</span>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter OpenAI API key..."
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      className="flex-grow p-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveKey('openai')}
                      className="p-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900/40 text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Clear key input"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={testingConnection !== null}
                      onClick={() => handleTestConnection('openai')}
                      className="px-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {testingConnection === 'openai' ? <Loader2 className="w-3 h-3 animate-spin text-violet-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                      Test
                    </button>
                  </div>
                </div>

                {/* 3. OpenRouter Key */}
                <div className="flex flex-col gap-1.5 p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                  <span className="text-[10px] font-extrabold text-slate-300">OpenRouter API Key:</span>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter OpenRouter API key..."
                      value={openrouterKey}
                      onChange={(e) => setOpenrouterKey(e.target.value)}
                      className="flex-grow p-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveKey('openrouter')}
                      className="p-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900/40 text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Clear key input"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={testingConnection !== null}
                      onClick={() => handleTestConnection('openrouter')}
                      className="px-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {testingConnection === 'openrouter' ? <Loader2 className="w-3 h-3 animate-spin text-violet-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                      Test
                    </button>
                  </div>
                </div>

                {/* 4. Groq Key */}
                <div className="flex flex-col gap-1.5 p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                  <span className="text-[10px] font-extrabold text-slate-300">Groq API Key:</span>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter Groq API key..."
                      value={groqKey}
                      onChange={(e) => setGroqKey(e.target.value)}
                      className="flex-grow p-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveKey('groq')}
                      className="p-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900/40 text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Clear key input"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={testingConnection !== null}
                      onClick={() => handleTestConnection('groq')}
                      className="px-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {testingConnection === 'groq' ? <Loader2 className="w-3 h-3 animate-spin text-violet-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                      Test
                    </button>
                  </div>
                </div>

                {/* 5. Together AI Key */}
                <div className="flex flex-col gap-1.5 p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
                  <span className="text-[10px] font-extrabold text-slate-300">Together AI API Key:</span>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter Together AI API key..."
                      value={togetherKey}
                      onChange={(e) => setTogetherKey(e.target.value)}
                      className="flex-grow p-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveKey('together')}
                      className="p-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900/40 text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Clear key input"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={testingConnection !== null}
                      onClick={() => handleTestConnection('together')}
                      className="px-3 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {testingConnection === 'together' ? <Loader2 className="w-3 h-3 animate-spin text-violet-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                      Test
                    </button>
                  </div>
                </div>

              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="w-full mt-4 py-3 bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-violet-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {savingSettings ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save System Settings ⚙ durability'}
              </button>
            </form>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
