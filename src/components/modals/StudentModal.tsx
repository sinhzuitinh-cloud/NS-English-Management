import { useState, useEffect, FormEvent } from 'react';
import { X, UserPlus, Save } from 'lucide-react';
import { Student, ClassItem, TuitionStatus } from '../../types';

interface StudentModalProps {
  isOpen: boolean;
  studentToEdit: Student | null;
  classes: ClassItem[];
  onClose: () => void;
  onSave: (studentData: Partial<Student>) => void;
}

export default function StudentModal({
  isOpen,
  studentToEdit,
  classes,
  onClose,
  onSave,
}: StudentModalProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [classCode, setClassCode] = useState('');
  const [tuitionStatus, setTuitionStatus] = useState<TuitionStatus>('Pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name || '');
      setDob(studentToEdit.dob || '');
      setGender(studentToEdit.gender || 'Nam');
      setPhone(studentToEdit.phone || '');
      setEmail(studentToEdit.email || '');
      setClassCode(studentToEdit.classCode || (classes[0]?.code ?? ''));
      setTuitionStatus(studentToEdit.tuitionStatus || 'Pending');
      setNotes(studentToEdit.notes || '');
    } else {
      setName('');
      setDob('');
      setGender('Nam');
      setPhone('');
      setEmail('');
      setClassCode(classes[0]?.code ?? '');
      setTuitionStatus('Pending');
      setNotes('');
    }
  }, [studentToEdit, classes, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim(),
      dob,
      gender,
      phone: phone.trim(),
      email: email.trim(),
      classCode,
      tuitionStatus,
      notes: notes.trim(),
    });
  };

  return (
    <div
      id="modal-student"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              {studentToEdit ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <h3 id="modal-student-title" className="font-extrabold text-lg text-[#0d1b2a]">
              {studentToEdit ? 'Cập Nhật Học Viên' : 'Thêm Học Viên Mới'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="student-form" onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Họ và Tên Học Viên *
            </label>
            <input
              type="text"
              id="student-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Nguyễn Văn An"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ngày Sinh</label>
              <input
                type="date"
                id="student-dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Giới Tính</label>
              <select
                id="student-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Nam' | 'Nữ')}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                SĐT Học Viên / PH *
              </label>
              <input
                type="tel"
                id="student-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912 345 678"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                id="student-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hocvien@gmail.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Xếp Lớp</label>
              <select
                id="student-class"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-amber-800"
              >
                {classes.length === 0 ? (
                  <option value="">Chưa có lớp học</option>
                ) : (
                  classes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.course}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Trạng Thái Học Phí
              </label>
              <select
                id="student-tuition"
                value={tuitionStatus}
                onChange={(e) => setTuitionStatus(e.target.value as TuitionStatus)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
              >
                <option value="Paid">Đã thanh toán</option>
                <option value="Pending">Chưa thanh toán</option>
                <option value="Overdue">Quá hạn</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Ghi Chú Đặc Biệt</label>
            <textarea
              id="student-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mục tiêu band score, lưu ý sức khỏe hoặc sở thích..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
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
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-[#070d18] font-black rounded-xl text-xs shadow-md shadow-amber-500/20 cursor-pointer"
            >
              {studentToEdit ? 'Lưu Cập Nhật' : 'Thêm Học Viên'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
