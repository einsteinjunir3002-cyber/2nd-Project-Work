import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  Bell, 
  Sun, 
  Moon, 
  Sparkles, 
  TrendingUp, 
  FileCheck, 
  Upload, 
  Shuffle,
  Users,
  Settings
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  onThemeToggle: () => void;
  isDark: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, onThemeToggle, isDark }) => {
  const { user, adminView, setAdminView, registerBiometrics } = useAuth();
  const { 
    currentStudentTab, 
    currentLecturerTab, 
    currentAdminTab,
    setTab, 
    notifications, 
    clearNotifications,
    showToast
  } = useAppState();

  const [showNotifications, setShowNotifications] = useState(false);
  const [registeringBio, setRegisteringBio] = useState(false);

  if (!user) return null;

  // Determine active view mode dynamically
  const isStudent = user.role === 'student' || (user.role === 'admin' && adminView === 'student');
  const isLecturer = user.role === 'lecturer' || (user.role === 'admin' && adminView === 'lecturer');

  const activeTab = isStudent 
    ? currentStudentTab 
    : isLecturer 
      ? currentLecturerTab 
      : currentAdminTab;

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleTabClick = (tabId: string) => {
    // Pass correct active role for tab changing
    const activeRole = isStudent ? 'student' : isLecturer ? 'lecturer' : 'admin';
    setTab(activeRole as any, tabId);
  };

  const handleEnrollBiometrics = async () => {
    setRegisteringBio(true);
    try {
      await registerBiometrics();
      showToast('🔒 Cryptographic biometric key registered successfully for this device!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Biometric key enrollment failed.', 'error');
    } finally {
      setRegisteringBio(false);
    }
  };

  // Nav Links setup
  const studentNav = [
    { id: 'student-dashboard', label: 'Student Hub', icon: LayoutDashboard },
    { id: 'student-notes', label: 'Lecture Materials', icon: BookOpen },
    { id: 'student-assignments', label: 'Assignment Deck', icon: FileCheck },
    { id: 'student-quizzes', label: 'Class Quizzes', icon: FileCheck },
    { id: 'student-chat', label: 'Chat Messenger', icon: MessageSquare },
    { id: 'student-consultations', label: 'Consultations', icon: Shuffle },
    { id: 'student-forum', label: 'Forums Board', icon: MessageSquare },
    { id: 'student-career-guidance', label: 'AI Career Path', icon: GraduationCap },
    { id: 'student-timetable', label: 'Timetable Planner', icon: Calendar },
    { id: 'student-universities', label: 'Ghana Universities', icon: GraduationCap },
  ];

  const lecturerNav = [
    { id: 'lecturer-dashboard', label: 'Lecturer Desk', icon: LayoutDashboard },
    { id: 'lecturer-uploads', label: 'Publish Materials', icon: Upload },
    { id: 'lecturer-quizzes', label: 'Quiz Builder', icon: FileCheck },
    { id: 'lecturer-chat', label: 'Chat Messenger', icon: MessageSquare },
    { id: 'lecturer-consultations', label: 'Consultations', icon: Shuffle },
    { id: 'lecturer-analytics', label: 'Class Analytics', icon: TrendingUp },
  ];

  const adminNav = [
    { id: 'admin-users', label: 'Manage Users', icon: Users },
    { id: 'admin-stats', label: 'Platform Stats', icon: TrendingUp },
    { id: 'admin-settings', label: 'System Settings', icon: Settings },
  ];

  const activeNav = isStudent 
    ? studentNav 
    : isLecturer 
      ? lecturerNav 
      : adminNav;

  const avatarSrc = user.role === 'admin' 
    ? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.name}`
    : isStudent 
      ? 'picture/avatar_student.svg' 
      : 'picture/avatar_lecturer.svg';

  const roleLabel = user.role === 'admin' 
    ? 'Administrator' 
    : isStudent 
      ? 'Student' 
      : 'Faculty Member';

  return (
    <aside className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col justify-between p-6 h-screen sticky top-0 z-40">
      
      {/* Header & Title */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">SmartLearn AI</h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">University Edition</span>
          </div>
        </div>

        {/* Profiles Box */}
        <div className="flex items-center gap-3 p-3 bg-slate-100/50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/40 dark:border-slate-700/30 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-violet-500/20">
            <img 
              src={avatarSrc} 
              alt={user.name} 
              className="object-cover w-full h-full"
              onError={(e) => {
                const imgEl = e.currentTarget;
                imgEl.src = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.name}`;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm truncate">{user.name}</h4>
            <span className="text-[10px] font-semibold text-slate-400 capitalize bg-slate-200 dark:bg-slate-700/50 px-2 py-0.5 rounded-full inline-block mt-0.5">
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Portal Switching triggers (Administrators Only) */}
        {user.role === 'admin' && (
          <div className="mb-6">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
              Portal Mode View
            </label>
            <select
              value={adminView}
              onChange={(e) => setAdminView(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-bold focus:outline-none cursor-pointer text-violet-500 dark:text-violet-400"
            >
              <option value="admin">🛠️ Admin Dashboard</option>
              <option value="student">🎓 Student Portal View</option>
              <option value="lecturer">💼 Lecturer Desk View</option>
            </select>
          </div>
        )}

        {/* Sidebar Nav Links */}
        <nav className="flex flex-col gap-1.5">
          {activeNav.map(item => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left w-full cursor-pointer ${
                  isSelected 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20 translate-x-1' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'stroke-[2.5px]' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Nav & Utilities */}
      <div className="flex flex-col gap-4">
        


        {/* Real-time Notifications Bell indicator */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) clearNotifications();
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold text-sm transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4" />
              <span>System Alerts</span>
            </div>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dynamic notifications popover dropdown */}
          {showNotifications && (
            <div className="absolute bottom-12 left-0 w-80 bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl p-4 max-h-72 overflow-y-auto z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs font-bold text-violet-400">Live Bulletins Feed</span>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>
              {notifications.length === 0 ? (
                <p className="text-[11px] text-slate-500 text-center py-6">No new notifications.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/60 text-[11px] leading-relaxed">
                      <p className="text-slate-300">{n.text}</p>
                      <span className="text-[9px] text-slate-500 block mt-1">{n.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Utilities (Theme, Logout) */}
        <div className="flex gap-2 border-t border-slate-200/50 dark:border-slate-800/40 pt-4">
          <button
            onClick={onThemeToggle}
            className="flex-1 flex items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
            title="Toggle color theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onLogout}
            className="flex-1 flex items-center justify-center p-3 rounded-xl border border-red-500/10 hover:border-red-500/30 bg-red-500/5 hover:bg-red-500/15 text-red-500 transition-all cursor-pointer"
            title="Sign out of platform"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
