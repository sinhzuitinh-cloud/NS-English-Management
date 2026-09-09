import { UserPlus, Trash2, KeyRound } from 'lucide-react';
import { UserAccount } from '../types';

interface CTVViewProps {
  accounts: UserAccount[];
  onOpenAddCTVModal: () => void;
  onDeleteCTV: (username: string) => void;
}

export default function CTVView({ accounts, onOpenAddCTVModal, onDeleteCTV }: CTVViewProps) {
  const ctvAccounts = accounts.filter((a) => a.role === 'ctv');

  return (
    <div id="view-ctv" className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#0d1b2a]">
            Danh Sách Tài Khoản Cộng Tác Viên (CTV) 🔑
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Chủ tài khoản có thể tạo và phân quyền cho CTV quản lý học viên, lớp học, điểm danh và
            bảng điểm.
          </p>
        </div>
        <button
          id="btn-open-add-ctv"
          onClick={onOpenAddCTVModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center space-x-2 shadow-md shadow-indigo-500/20 shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Cấp Tài Khoản CTV</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Tên Cộng Tác Viên</th>
                <th className="py-3.5 px-4">Tên Đăng Nhập</th>
                <th className="py-3.5 px-4">Mật Khẩu</th>
                <th className="py-3.5 px-4">Quyền Hạn</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody id="ctv-table-body" className="divide-y divide-slate-100 text-sm">
              {ctvAccounts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 font-medium text-xs">
                    <KeyRound className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    Chưa có tài khoản Cộng tác viên nào. Nhấn "Cấp Tài Khoản CTV" để thêm mới.
                  </td>
                </tr>
              ) : (
                ctvAccounts.map((c) => (
                  <tr key={c.username} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs border border-indigo-100">
                          {c.name.charAt(0)}
                        </div>
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 font-bold text-xs">
                      {c.username}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-xs">{c.password}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                        Quản lý Học viên & Điểm danh
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onDeleteCTV(c.username)}
                        title="Xóa tài khoản CTV"
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
