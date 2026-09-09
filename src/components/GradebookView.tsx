import { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { Student, ClassItem, GradebookRecords } from '../types';

interface GradebookViewProps {
  classes: ClassItem[];
  students: Student[];
  gradebookRecords: GradebookRecords;
  onUpdateGrade: (
    studentId: string,
    field: 'listening' | 'speaking' | 'reading' | 'writing' | 'comment',
    value: string | number
  ) => void;
}

export default function GradebookView({
  classes,
  students,
  gradebookRecords,
  onUpdateGrade,
}: GradebookViewProps) {
  const [selectedClassCode, setSelectedClassCode] = useState<string>(classes[0]?.code || '');

  useEffect(() => {
    if (!selectedClassCode && classes.length > 0) {
      setSelectedClassCode(classes[0].code);
    }
  }, [classes, selectedClassCode]);

  const enrolledStudents = students.filter((s) => s.classCode === selectedClassCode);

  return (
    <div id="view-gradebook" className="space-y-6">
      {/* Top Filter */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
            Chọn Lớp Học Cần Nhập Điểm
          </label>
          <select
            id="gradebook-class-select"
            value={selectedClassCode}
            onChange={(e) => setSelectedClassCode(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-2xl p-2.5 w-64 focus:ring-2 focus:ring-amber-500/20"
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

        <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold bg-amber-50 px-3.5 py-2 rounded-2xl border border-amber-200/60">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Điểm số theo thang điểm 0 - 9.0 (IELTS/Cambridge)</span>
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 min-w-[160px]">Học Viên</th>
                <th className="py-3.5 px-4 text-center w-24">Listening 🎧</th>
                <th className="py-3.5 px-4 text-center w-24">Speaking 🗣️</th>
                <th className="py-3.5 px-4 text-center w-24">Reading 📖</th>
                <th className="py-3.5 px-4 text-center w-24">Writing ✍️</th>
                <th className="py-3.5 px-4 min-w-[220px]">Nhận Xét Giáo Viên</th>
              </tr>
            </thead>
            <tbody id="gradebook-table-body" className="divide-y divide-slate-100 text-sm">
              {enrolledStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 text-xs">
                    {classes.length === 0
                      ? 'Chưa có lớp học nào trong hệ thống.'
                      : 'Không có học viên nào được xếp vào lớp này.'}
                  </td>
                </tr>
              ) : (
                enrolledStudents.map((s) => {
                  const rec = gradebookRecords[s.id] || {
                    listening: '',
                    speaking: '',
                    reading: '',
                    writing: '',
                    comment: '',
                  };

                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-100">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                            <p className="text-xs text-slate-400 font-mono">ID: {s.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="9"
                          value={rec.listening}
                          onChange={(e) => onUpdateGrade(s.id, 'listening', e.target.value)}
                          placeholder="-"
                          className="w-16 text-center bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                        />
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="9"
                          value={rec.speaking}
                          onChange={(e) => onUpdateGrade(s.id, 'speaking', e.target.value)}
                          placeholder="-"
                          className="w-16 text-center bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                        />
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="9"
                          value={rec.reading}
                          onChange={(e) => onUpdateGrade(s.id, 'reading', e.target.value)}
                          placeholder="-"
                          className="w-16 text-center bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                        />
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="9"
                          value={rec.writing}
                          onChange={(e) => onUpdateGrade(s.id, 'writing', e.target.value)}
                          placeholder="-"
                          className="w-16 text-center bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                        />
                      </td>

                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          value={rec.comment}
                          onChange={(e) => onUpdateGrade(s.id, 'comment', e.target.value)}
                          placeholder="Ghi chú nhận xét tiến bộ của học viên..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                        />
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
