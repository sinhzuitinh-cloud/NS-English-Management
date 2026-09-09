import { X, Phone, Mail, Calendar, User, FileText, CheckCircle2 } from 'lucide-react';
import { Student, ClassItem } from '../../types';

interface StudentDetailModalProps {
  isOpen: boolean;
  student: Student | null;
  classes: ClassItem[];
  onClose: () => void;
}

export default function StudentDetailModal({
  isOpen,
  student,
  classes,
  onClose,
}: StudentDetailModalProps) {
  if (!isOpen || !student) return null;

  const currentClass = classes.find((c) => c.code === student.classCode);

  return (
    <div
      id="modal-view-student"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="font-extrabold text-lg text-[#0d1b2a]">Hồ Sơ Học Viên NS English</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div id="student-detail-content" className="mt-4 space-y-4">
          {/* Header info */}
          <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-[#070d18] font-black flex items-center justify-center text-xl shadow-md">
              {student.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-[#0d1b2a]">{student.name}</h4>
              <p className="text-xs text-amber-700 font-bold">
                {student.classCode} - {currentClass ? currentClass.course : 'Chưa xếp lớp'}
              </p>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Mã HV: <span className="font-mono font-bold text-slate-600">{student.id}</span> |
                Ngày gia nhập: {student.joinDate}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-slate-200/80 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5" />
                <span>SĐT Liên hệ</span>
              </span>
              <p className="font-bold text-slate-800 text-sm">{student.phone}</p>
            </div>

            <div className="p-3 bg-white border border-slate-200/80 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </span>
              <p className="font-bold text-slate-800 text-sm truncate">{student.email || '—'}</p>
            </div>

            <div className="p-3 bg-white border border-slate-200/80 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Ngày Sinh</span>
              </span>
              <p className="font-bold text-slate-800 text-sm">{student.dob || 'Chưa cập nhật'}</p>
            </div>

            <div className="p-3 bg-white border border-slate-200/80 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium flex items-center space-x-1">
                <User className="w-3.5 h-3.5" />
                <span>Giới Tính</span>
              </span>
              <p className="font-bold text-slate-800 text-sm">{student.gender || 'Nam'}</p>
            </div>
          </div>

          {/* Tuition Status */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-600">Trạng Thái Học Phí:</span>
            </div>
            {student.tuitionStatus === 'Paid' ? (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-xl">
                Đã thanh toán
              </span>
            ) : student.tuitionStatus === 'Pending' ? (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-xl">
                Chờ thanh toán
              </span>
            ) : (
              <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-black rounded-xl">
                Quá hạn
              </span>
            )}
          </div>

          {/* Notes */}
          {student.notes && (
            <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-amber-800 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Ghi chú học viên:</span>
              </span>
              <p className="text-xs text-amber-900 font-medium leading-relaxed">{student.notes}</p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
            >
              Đóng Hồ Sơ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
