import { useState, useEffect } from 'react';
import { Save, Calendar, Users, CheckCheck } from 'lucide-react';
import { Student, ClassItem, AttendanceRecords, AttendanceStatus } from '../types';

interface AttendanceViewProps {
  classes: ClassItem[];
  students: Student[];
  attendanceRecords: AttendanceRecords;
  onSaveAttendance: (classCode: string, date: string, records: Record<string, AttendanceStatus>) => void;
}

export default function AttendanceView({
  classes,
  students,
  attendanceRecords,
  onSaveAttendance,
}: AttendanceViewProps) {
  const [selectedClassCode, setSelectedClassCode] = useState<string>(classes[0]?.code || '');
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [currentStatuses, setCurrentStatuses] = useState<Record<string, AttendanceStatus>>({});

  // Sync selected class if empty and classes arrive
  useEffect(() => {
    if (!selectedClassCode && classes.length > 0) {
      setSelectedClassCode(classes[0].code);
    }
  }, [classes, selectedClassCode]);

  // Load existing records whenever class or date changes
  useEffect(() => {
    if (!selectedClassCode || !attendanceDate) return;
    const key = `${selectedClassCode}_${attendanceDate}`;
    const existing = attendanceRecords[key] || {};
    const enrolled = students.filter((s) => s.classCode === selectedClassCode);

    const initial: Record<string, AttendanceStatus> = {};
    enrolled.forEach((s) => {
      initial[s.id] = existing[s.id] || 'Present';
    });
    setCurrentStatuses(initial);
  }, [selectedClassCode, attendanceDate, attendanceRecords, students]);

  const enrolledStudents = students.filter((s) => s.classCode === selectedClassCode);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setCurrentStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    enrolledStudents.forEach((s) => {
      updated[s.id] = 'Present';
    });
    setCurrentStatuses(updated);
  };

  const handleSave = () => {
    if (!selectedClassCode || !attendanceDate) return;
    onSaveAttendance(selectedClassCode, attendanceDate, currentStatuses);
  };

  return (
    <div id="view-attendance" className="space-y-6">
      {/* Control panel */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Chọn Lớp Học
            </label>
            <select
              id="attendance-class-select"
              value={selectedClassCode}
              onChange={(e) => setSelectedClassCode(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-2xl p-2.5 w-64 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
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
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Ngày Điểm Danh
            </label>
            <div className="relative">
              <input
                type="date"
                id="attendance-date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-2xl p-2.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 w-full md:w-auto justify-end">
          {enrolledStudents.length > 0 && (
            <button
              onClick={handleMarkAllPresent}
              className="text-xs font-bold px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-2xl transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Đánh dấu tất cả có mặt"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tất cả có mặt</span>
            </button>
          )}

          <button
            id="btn-save-attendance"
            onClick={handleSave}
            disabled={!selectedClassCode || enrolledStudents.length === 0}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold px-6 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Điểm Danh</span>
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-slate-50/50">
          <span className="text-sm font-extrabold text-slate-800" id="attendance-class-info">
            Danh sách điểm danh lớp: <span className="text-amber-600">{selectedClassCode || 'Chưa chọn'}</span> - Ngày:{' '}
            <span className="text-slate-600 font-semibold">{attendanceDate}</span>
          </span>
          <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" /> Có mặt
            </span>
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5" /> Đi muộn
            </span>
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5" /> Vắng mặt
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                <th className="py-3.5 px-4 w-14">STT</th>
                <th className="py-3.5 px-4">Học Viên</th>
                <th className="py-3.5 px-4">SĐT Phụ Huynh</th>
                <th className="py-3.5 px-4 text-center">Trạng Thái Điểm Danh</th>
              </tr>
            </thead>
            <tbody id="attendance-table-body" className="divide-y divide-slate-100 text-sm">
              {enrolledStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400 text-xs">
                    {classes.length === 0
                      ? 'Chưa có lớp học nào trong hệ thống.'
                      : 'Không có học viên nào được xếp vào lớp này.'}
                  </td>
                </tr>
              ) : (
                enrolledStudents.map((s, idx) => {
                  const status = currentStatuses[s.id] || 'Present';

                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-400 text-xs">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                            {s.name.charAt(0)}
                          </div>
                          <span>{s.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs font-medium">{s.phone}</td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'Present')}
                            className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                              status === 'Present'
                                ? 'bg-emerald-500 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Có mặt
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'Late')}
                            className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                              status === 'Late'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Đi muộn
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'Absent')}
                            className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                              status === 'Absent'
                                ? 'bg-rose-500 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Vắng mặt
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
