import {
  PieChart,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Receipt,
  PenSquare,
  UsersRound,
  LogOut,
  X,
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { UserAccount, ActiveTab } from '../types';

interface SidebarProps {
  currentUser: UserAccount;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  currentUser,
  activeTab,
  onTabChange,
  onLogout,
  isOpen,
  onClose,
}: SidebarProps) {
  const isOwner = currentUser.role === 'admin';

  const navItems: { id: ActiveTab; label: string; icon: typeof PieChart; adminOnly?: boolean }[] = [
    { id: 'dashboard', label: 'Tổng Quan 🌟', icon: PieChart },
    { id: 'students', label: 'Học Viên 🎓', icon: GraduationCap },
    { id: 'classes', label: 'Lớp Học 📚', icon: BookOpen },
    { id: 'attendance', label: 'Điểm Danh ✏️', icon: ClipboardCheck },
    { id: 'tuition', label: 'Học Phí 💰', icon: Receipt, adminOnly: true },
    { id: 'gradebook', label: 'Bảng Điểm 🏆', icon: PenSquare },
    { id: 'ctv', label: 'Quản Lý CTV 🔑', icon: UsersRound, adminOnly: true },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="sidebar"
        className={`w-68 bg-[#0d1b2a] text-white flex flex-col transition-all duration-300 z-40 fixed inset-y-0 left-0 md:relative md:translate-x-0 shadow-2xl border-r border-[#1b263b] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Header */}
        <div className="p-5 flex items-center justify-between border-b border-[#1b263b]/80 bg-[#070d18]/40">
          <div className="flex items-center space-x-3.5">
            <BrandLogo size="md" />
            <div>
              <div className="flex items-center space-x-1">
                <h1 className="font-extrabold text-base tracking-wide text-white">NS ENGLISH</h1>
                <span className="text-xs">✨</span>
              </div>
              <p className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase">
                Academy Manager
              </p>
            </div>
          </div>
          <button
            id="close-sidebar-btn"
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            if (item.adminOnly && !isOwner) return null;
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#070d18] shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-300 hover:bg-[#1b263b] hover:text-amber-300'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#070d18]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User profile footer */}
        <div className="p-4 border-t border-[#1b263b]/80 bg-[#070d18]/30">
          <div className="bg-[#1b263b]/60 p-3 rounded-2xl border border-slate-700/40 space-y-2.5">
            <div className="flex items-center space-x-3">
              <div
                id="user-avatar-badge"
                className="w-9 h-9 rounded-xl bg-amber-400 text-[#0d1b2a] flex items-center justify-center font-bold text-xs shadow-md shadow-amber-500/20 shrink-0"
              >
                {isOwner ? 'NS' : currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p id="user-display-name" className="text-xs font-bold text-white truncate">
                  {currentUser.name}
                </p>
                <span
                  id="user-role-badge"
                  className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                    isOwner
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                      : 'bg-sky-400/20 text-sky-300 border-sky-400/30'
                  }`}
                >
                  {isOwner ? 'Chủ Trung Tâm' : 'Cộng Tác Viên'}
                </span>
              </div>
            </div>

            <button
              id="btn-logout"
              onClick={onLogout}
              className="w-full py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng Xuất Tài Khoản</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
