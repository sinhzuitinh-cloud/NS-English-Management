import { Plus, School, Users, Clock, MapPin, BadgeDollarSign, Trash2 } from 'lucide-react';
import { ClassItem, Student } from '../types';

interface ClassesViewProps {
  classes: ClassItem[];
  students: Student[];
  onOpenAddClass: () => void;
  onDeleteClass?: (code: string) => void;
}

export default function ClassesView({
  classes,
  students,
  onOpenAddClass,
  onDeleteClass,
}: ClassesViewProps) {
  return (
    <div id="view-classes" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#0d1b2a]">
            Danh Sách Lớp Học Tại NS English 📚
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý lịch học, giáo viên phụ trách, phòng học và mức học phí từng khóa
          </p>
        </div>
        <button
          id="btn-open-add-class"
          onClick={onOpenAddClass}
          className="bg-amber-500 hover:bg-amber-600 text-[#070d18] font-extrabold px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center space-x-2 shadow-md shadow-amber-500/20 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Lớp Mới</span>
        </button>
      </div>

      {classes.length === 0 ? (
        <div
          id="classes-empty-state"
          className="p-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3"
        >
          <School className="w-12 h-12 mx-auto text-slate-300" />
          <p className="text-sm font-medium">
            Dữ liệu lớp học hiện đang trống. Nhấn "Thêm Lớp Mới" để tạo lớp học đầu tiên.
          </p>
          <button
            onClick={onOpenAddClass}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-500 text-[#070d18] font-bold text-xs rounded-xl shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo Lớp Đầu Tiên</span>
          </button>
        </div>
      ) : (
        <div id="classes-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((c) => {
            const enrolledCount = students.filter((s) => s.classCode === c.code).length;

            return (
              <div
                key={c.code}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-amber-400/80 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-3 py-1 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
                      {c.code}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-lg">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>{enrolledCount} học viên</span>
                      </span>
                      {onDeleteClass && (
                        <button
                          onClick={() => onDeleteClass(c.code)}
                          title="Xóa lớp học"
                          className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h4 className="font-extrabold text-[#0d1b2a] text-lg mb-1">{c.course}</h4>
                  <p className="text-xs text-slate-500 mb-4 font-medium">Giáo viên: {c.teacher}</p>

                  <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Lịch học:</span>
                      </span>
                      <span className="font-semibold text-slate-800">{c.schedule}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Phòng học:</span>
                      </span>
                      <span className="font-semibold text-slate-800">{c.room}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center space-x-1">
                        <BadgeDollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span>Học phí khóa:</span>
                      </span>
                      <span className="font-black text-amber-600 text-sm">
                        {Number(c.fee).toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
