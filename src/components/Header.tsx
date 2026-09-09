import { Menu, Plus, Trash2, Bell, Sparkles } from 'lucide-react';
import { ActiveTab, UserAccount } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  currentUser: UserAccount;
  onOpenSidebar: () => void;
  onOpenAddStudent: () => void;
  onClearAllData: () => void;
  onSeedSampleData: () => void;
  hasData: boolean;
}

export default function Header({
  activeTab,
  currentUser,
  onOpenSidebar,
  onOpenAddStudent,
  onClearAllData,
  onSeedSampleData,
  hasData,
}: HeaderProps) {
  const titles: Record<ActiveTab, string> = {
    dashboard: 'Tổng Quan Trung Tâm 🌟',
    students: 'Quản Lý Học Viên 🎓',
    classes: 'Danh Sách Lớp Học 📚',
    attendance: 'Điểm Danh Chuyên Cần ✏️',
    tuition: 'Theo Dõi Học Phí 💰',
    gradebook: 'Bảng Điểm & Nhận Xét 🏆',
    ctv: 'Quản Lý Tài Khoản CTV 🔑',
  };

  const isOwner = currentUser.role === 'admin';

  return (
    <header
      id="app-header"
      className="bg-white/90 backdrop-blur-md border-b border-amber-100/60 h-16 flex items-center justify-between px-4 md:px-8 shrink-0 z-10 shadow-xs"
    >
      <div className="flex items-center space-x-3 md:space-x-4">
        <button
          id="open-sidebar-btn"
          onClick={onOpenSidebar}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-amber-50"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 id="header-title" className="text-base md:text-xl font-extrabold text-[#0d1b2a]">
            {titles[activeTab]}
          </h2>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Quick sample seed button if empty */}
        {!hasData && (
          <button
            id="btn-seed-data"
            onClick={onSeedSampleData}
            className="flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 px-3 py-2 rounded-2xl text-xs font-bold transition-all shadow-xs"
            title="Thêm dữ liệu mẫu thử nghiệm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Nạp Dữ Liệu Mẫu</span>
          </button>
        )}

        {isOwner && (
          <button
            id="btn-clear-all-data"
            onClick={onClearAllData}
            className="flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 px-3 py-2 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Xóa toàn bộ dữ liệu học viên và lớp học"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xóa Dữ Liệu</span>
          </button>
        )}

        <button
          id="btn-open-add-student"
          onClick={onOpenAddStudent}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#070d18] font-black px-3.5 md:px-4 py-2 rounded-2xl text-xs transition-all shadow-md shadow-amber-500/20 border border-amber-400 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm Học Viên</span>
        </button>

        <div className="relative">
          <button
            id="btn-notifications"
            className="p-2.5 rounded-2xl border border-slate-200/80 bg-white text-slate-600 hover:bg-amber-50 relative transition-colors"
            title="Thông báo"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
