import { useState, FormEvent } from 'react';
import { X, UserPlus, ShieldCheck } from 'lucide-react';
import { UserAccount } from '../../types';

interface CTVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: UserAccount) => void;
}

export default function CTVModal({ isOpen, onClose, onSave }: CTVModalProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !password.trim()) return;

    onSave({
      name: name.trim(),
      username: username.trim(),
      password: password.trim(),
      role: 'ctv',
    });

    setName('');
    setUsername('');
    setPassword('');
  };

  return (
    <div
      id="modal-add-ctv"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-lg text-[#0d1b2a]">Cấp Tài Khoản CTV Mới</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="ctv-form" onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Họ và Tên CTV *
            </label>
            <input
              type="text"
              id="ctv-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Nguyễn Văn Anh"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tên Đăng Nhập *
            </label>
            <input
              type="text"
              id="ctv-username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="VD: ctv_vananh"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mật Khẩu *
            </label>
            <input
              type="text"
              id="ctv-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu cho CTV..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs text-indigo-950 font-medium space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold text-indigo-900">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Phân quyền tài khoản CTV:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-indigo-800/90 pl-1">
              <li>Xem và quản lý học viên, xếp lớp</li>
              <li>Xem danh sách lớp học và lịch dạy</li>
              <li>Điểm danh học viên theo buổi học</li>
              <li>Xem và cập nhật điểm số, nhận xét 4 kỹ năng</li>
              <li className="text-slate-400 italic">Không có quyền xem học phí và tài khoản</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              Cấp Tài Khoản CTV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
