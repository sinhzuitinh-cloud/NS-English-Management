import { useState, useMemo } from 'react';
import { Search, FileSpreadsheet, Eye, Edit3, Trash2, FolderOpen, UserPlus } from 'lucide-react';
import { Student, ClassItem } from '../types';

interface StudentsViewProps {
  students: Student[];
  classes: ClassItem[];
  onOpenAddModal: () => void;
  onOpenEditModal: (student: Student) => void;
  onOpenDetailModal: (student: Student) => void;
  onDeleteStudent: (id: string, name: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export default function StudentsView({
  students,
  classes,
  onOpenAddModal,
  onOpenEditModal,
  onOpenDetailModal,
  onDeleteStudent,
  onShowToast,
}: StudentsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedTuition, setSelectedTuition] = useState('ALL');

  const filteredStudents = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return students.filter((s) => {
      const matchSearch =
        !term ||
        s.name.toLowerCase().includes(term) ||
        s.phone.includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.id.toLowerCase().includes(term);

      const matchClass = selectedClass === 'ALL' || s.classCode === selectedClass;
      const matchTuition = selectedTuition === 'ALL' || s.tuitionStatus === selectedTuition;

      return matchSearch && matchClass && matchTuition;
    });
  }, [students, searchTerm, selectedClass, selectedTuition]);

  const handleExportCSV = () => {
    if (students.length === 0) {
      onShowToast('Chưa có học viên nào để xuất dữ liệu!', 'error');
      return;
    }

    let csv = '\uFEFFMã HV,Họ Tên,Ngày Sinh,Giới Tính,Lớp,SĐT,Email,Ngày Nhập Học,Trạng Thái Học Phí,Ghi Chú\n';
    students.forEach((s) => {
      csv += `"${s.id}","${s.name}","${s.dob || ''}","${s.gender}","${s.classCode}","${s.phone}","${s.email}","${s.joinDate}","${s.tuitionStatus}","${s.notes || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `NS_English_HocVien_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    onShowToast('Đã xuất file dữ liệu Excel CSV thành công!');
  };

  return (
    <div id="view-students" className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            id="student-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tên, SĐT, email, mã HV..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <select
            id="filter-class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-2xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20"
          >
            <option value="ALL">Tất cả lớp học ({classes.length})</option>
            {classes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.course}
              </option>
            ))}
          </select>

          <select
            id="filter-tuition"
            value={selectedTuition}
            onChange={(e) => setSelectedTuition(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-2xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20"
          >
            <option value="ALL">Tất cả học phí</option>
            <option value="Paid">Đã thanh toán</option>
            <option value="Pending">Chờ thanh toán</option>
            <option value="Overdue">Quá hạn</option>
          </select>

          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2 rounded-2xl text-xs transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Học Viên</th>
                <th className="py-3.5 px-4">Khóa / Lớp</th>
                <th className="py-3.5 px-4">Liên Hệ PH</th>
                <th className="py-3.5 px-4">Ngày Nhập Học</th>
                <th className="py-3.5 px-4">Học Phí</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody id="students-table-body" className="divide-y divide-slate-100 text-sm">
              {filteredStudents.map((s) => {
                const tuitionBadge =
                  s.tuitionStatus === 'Paid' ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Đã thanh toán
                    </span>
                  ) : s.tuitionStatus === 'Pending' ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Chưa thanh toán
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      Quá hạn
                    </span>
                  );

                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm border border-amber-200">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                          <p className="text-xs text-slate-400 font-mono">ID: {s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl text-xs border border-amber-200">
                        {s.classCode || 'Chưa xếp'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-slate-800 font-medium text-xs md:text-sm">{s.phone}</p>
                      <p className="text-xs text-slate-400">{s.email || '—'}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs font-medium">{s.joinDate}</td>
                    <td className="py-3.5 px-4">{tuitionBadge}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          id={`view-student-${s.id}`}
                          onClick={() => onOpenDetailModal(s)}
                          title="Xem hồ sơ"
                          className="p-2 text-slate-400 hover:text-amber-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          id={`edit-student-${s.id}`}
                          onClick={() => onOpenEditModal(s)}
                          title="Sửa thông tin"
                          className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          id={`delete-student-${s.id}`}
                          onClick={() => onDeleteStudent(s.id, s.name)}
                          title="Xóa học viên"
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div id="students-empty-state" className="p-12 text-center text-slate-500 space-y-3">
            <FolderOpen className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-medium">
              {students.length === 0
                ? 'Dữ liệu học viên hiện đang trống. Nhấn "Thêm Học Viên" để nhập dữ liệu mới.'
                : 'Không tìm thấy học viên phù hợp với bộ lọc tìm kiếm.'}
            </p>
            {students.length === 0 && (
              <button
                onClick={onOpenAddModal}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#070d18] font-bold text-xs rounded-xl shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Thêm Học Viên Đầu Tiên</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
