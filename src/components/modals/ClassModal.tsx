import { useState, FormEvent } from 'react';
import { X, BookOpen } from 'lucide-react';
import { ClassItem } from '../../types';

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (classData: ClassItem) => void;
}

export default function ClassModal({ isOpen, onClose, onSave }: ClassModalProps) {
  const [code, setCode] = useState('');
  const [course, setCourse] = useState('');
  const [teacher, setTeacher] = useState('');
  const [schedule, setSchedule] = useState('');
  const [room, setRoom] = useState('');
  const [fee, setFee] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !course.trim()) return;

    onSave({
      code: code.trim().toUpperCase(),
      course: course.trim(),
      teacher: teacher.trim() || 'Chưa phân công',
      schedule: schedule.trim() || 'Lịch linh hoạt',
      room: room.trim() || 'Phòng học chính',
      fee: Number(fee) || 0,
    });

    setCode('');
    setCourse('');
    setTeacher('');
    setSchedule('');
    setRoom('');
    setFee('');
  };

  return (
    <div
      id="modal-class"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-lg text-[#0d1b2a]">Thêm Lớp Học Mới</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="class-form" onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mã / Ký Hiệu Lớp *
            </label>
            <input
              type="text"
              id="class-code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="VD: IE65-02"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-amber-900 uppercase focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Khóa Học *</label>
            <input
              type="text"
              id="class-course"
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="VD: IELTS Band 6.5+ Master"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Giáo Viên Phụ Trách
            </label>
            <input
              type="text"
              id="class-teacher"
              required
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="VD: Ms. Sarah Johnson"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lịch Học</label>
              <input
                type="text"
                id="class-schedule"
                required
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="T2-T4-T6 18:00"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phòng Học</label>
              <input
                type="text"
                id="class-room"
                required
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Phòng 102"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Học Phí / Khóa (VNĐ)
            </label>
            <input
              type="number"
              id="class-fee"
              required
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="5500000"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-amber-700"
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
              Tạo Lớp Học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
