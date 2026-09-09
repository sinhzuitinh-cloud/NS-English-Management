import { useState } from 'react';
import { CheckCircle2, Clock, AlertOctagon, RotateCw } from 'lucide-react';
import { Student, ClassItem, TuitionStatus } from '../types';

interface TuitionViewProps {
  students: Student[];
  classes: ClassItem[];
  onToggleStatus: (studentId: string) => void;
  onSetStatus?: (studentId: string, status: TuitionStatus) => void;
}

export default function TuitionView({
  students,
  classes,
  onToggleStatus,
  onSetStatus,
}: TuitionViewProps) {
  const [filter, setFilter] = useState<'ALL' | TuitionStatus>('ALL');

  let paidTotal = 0;
  let pendingTotal = 0;
  let overdueTotal = 0;

  students.forEach((s) => {
    const cls = classes.find((c) => c.code === s.classCode);
    const fee = cls ? cls.fee : 0;
    if (s.tuitionStatus === 'Paid') paidTotal += fee;
    else if (s.tuitionStatus === 'Pending') pendingTotal += fee;
    else overdueTotal += fee;
  });

  const filtered = students.filter((s) => {
    if (filter === 'ALL') return true;
    return s.tuitionStatus === filter;
  });

  return (
    <div id="view-tuition" className="space-y-6">
      {/* 3 Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-emerald-100/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Đã Thu Trong Tháng
            </p>
            <h3 id="tuition-paid-sum" className="text-2xl font-black text-emerald-600 mt-1">
              {(paidTotal / 1000000).toFixed(1)} Trđ
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {students.filter((s) => s.tuitionStatus === 'Paid').length} học viên
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-amber-100/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Chờ Thanh Toán
            </p>
            <h3 id="tuition-pending-sum" className="text-2xl font-black text-amber-500 mt-1">
              {(pendingTotal / 1000000).toFixed(1)} Trđ
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {students.filter((s) => s.tuitionStatus === 'Pending').length} học viên
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-rose-100/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Công Nợ Quá Hạn
            </p>
            <h3 id="tuition-overdue-sum" className="text-2xl font-black text-rose-600 mt-1">
              {(overdueTotal / 1000000).toFixed(1)} Trđ
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {students.filter((s) => s.tuitionStatus === 'Overdue').length} học viên
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertOctagon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sổ theo dõi học phí */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h3 className="font-extrabold text-base text-[#0d1b2a]">Sổ Theo Dõi Thu Học Phí 💰</h3>
            <p className="text-xs text-slate-400">Danh sách thu học phí học viên theo từng lớp</p>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl">
            {(['ALL', 'Paid', 'Pending', 'Overdue'] as const).map((tabKey) => {
              const label = {
                ALL: 'Tất cả',
                Paid: 'Đã đóng',
                Pending: 'Chờ đóng',
                Overdue: 'Quá hạn',
              }[tabKey];

              return (
                <button
                  key={tabKey}
                  onClick={() => setFilter(tabKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filter === tabKey
                      ? 'bg-white text-slate-800 shadow-xs font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Học Viên</th>
                <th className="py-3.5 px-4">Lớp Học</th>
                <th className="py-3.5 px-4">Mức Học Phí</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody id="tuition-table-body" className="divide-y divide-slate-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 text-xs">
                    Không có học viên nào trong danh mục này.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const cls = classes.find((c) => c.code === s.classCode);
                  const fee = cls ? cls.fee : 0;

                  const statusBadge =
                    s.tuitionStatus === 'Paid' ? (
                      <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl text-xs font-extrabold border border-emerald-200">
                        Đã Thanh Toán
                      </span>
                    ) : s.tuitionStatus === 'Pending' ? (
                      <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-xl text-xs font-extrabold border border-amber-200">
                        Chờ Thanh Toán
                      </span>
                    ) : (
                      <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-xl text-xs font-extrabold border border-rose-200">
                        Quá Hạn
                      </span>
                    );

                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                            <p className="text-xs text-slate-400 font-mono">{s.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-amber-800 text-xs">
                        {s.classCode || 'Chưa xếp'}
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-800">
                        {fee.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="py-3.5 px-4">{statusBadge}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center space-x-2 justify-end">
                          <button
                            id={`toggle-tuition-${s.id}`}
                            onClick={() => onToggleStatus(s.id)}
                            className="text-xs font-bold px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
                            title="Chuyển đổi trạng thái"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Đổi Trạng Thái</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
