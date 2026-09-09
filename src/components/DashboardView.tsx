import { Users, School, Wallet, AlertTriangle, Clock, Calendar } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Student, ClassItem } from '../types';

interface DashboardViewProps {
  students: Student[];
  classes: ClassItem[];
  onNavigateToStudents: () => void;
}

export default function DashboardView({
  students,
  classes,
  onNavigateToStudents,
}: DashboardViewProps) {
  const totalStudents = students.length;
  const totalClasses = classes.length;

  let paidCount = 0;
  let pendingCount = 0;
  let overdueCount = 0;
  let totalRevenue = 0;

  students.forEach((s) => {
    const cls = classes.find((c) => c.code === s.classCode);
    const fee = cls ? cls.fee : 0;
    if (s.tuitionStatus === 'Paid') {
      paidCount++;
      totalRevenue += fee;
    } else if (s.tuitionStatus === 'Pending') {
      pendingCount++;
    } else {
      overdueCount++;
    }
  });

  const unpaidCount = pendingCount + overdueCount;

  // Monthly revenue mock data based on current students
  const revenueData = [
    { month: 'T1', doanhThu: totalStudents > 0 ? 15 : 0 },
    { month: 'T2', doanhThu: totalStudents > 0 ? 25 : 0 },
    { month: 'T3', doanhThu: totalStudents > 0 ? 32 : 0 },
    { month: 'T4', doanhThu: totalStudents > 0 ? 45 : 0 },
    { month: 'T5', doanhThu: totalStudents > 0 ? 52 : 0 },
    { month: 'T6', doanhThu: totalStudents > 0 ? 68 : 0 },
    { month: 'T7', doanhThu: totalStudents > 0 ? 75 : 0 },
    { month: 'T8', doanhThu: totalStudents > 0 ? 82 : 0 },
    { month: 'T9', doanhThu: Math.round(totalRevenue / 1000000) || (totalStudents > 0 ? 88 : 0) },
  ];

  const pieData =
    totalStudents > 0
      ? [
          { name: 'Đã thanh toán', value: paidCount, color: '#10b981' },
          { name: 'Chờ thanh toán', value: pendingCount, color: '#f59e0b' },
          { name: 'Quá hạn', value: overdueCount, color: '#ef4444' },
        ].filter((d) => d.value > 0)
      : [{ name: 'Chưa có dữ liệu', value: 1, color: '#cbd5e1' }];

  const todayStr = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <div id="view-dashboard" className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <div className="bg-white p-5 rounded-3xl border border-indigo-100/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Tổng Học Viên 🎓
            </p>
            <h3 id="stat-total-students" className="text-2xl font-extrabold text-[#0d1b2a] mt-1">
              {totalStudents}
            </h3>
            <p className="text-xs text-emerald-600 font-bold mt-1">Đang theo học</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold border border-indigo-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-100/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Lớp Đang Mở 📚
            </p>
            <h3 id="stat-total-classes" className="text-2xl font-extrabold text-[#0d1b2a] mt-1">
              {totalClasses}
            </h3>
            <p className="text-xs text-emerald-600 font-bold mt-1">Đang hoạt động</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold border border-emerald-100">
            <School className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-amber-100/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Doanh Thu Học Phí 💰
            </p>
            <h3 id="stat-total-revenue" className="text-2xl font-extrabold text-[#0d1b2a] mt-1">
              {(totalRevenue / 1000000).toFixed(1)} Trđ
            </h3>
            <p className="text-xs text-amber-600 font-bold mt-1">Tháng hiện tại</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold border border-amber-100">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-rose-100/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Chưa Đóng Phí ⏰
            </p>
            <h3 id="stat-pending-tuition" className="text-2xl font-extrabold text-rose-600 mt-1">
              {unpaidCount}
            </h3>
            <p className="text-xs text-rose-500 font-bold mt-1">Cần nhắc nhở</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold border border-rose-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-[#0d1b2a] text-base">
                Biểu Đồ Theo Dõi Thu Học Phí 📊
              </h3>
              <p className="text-xs text-slate-400">Doanh số học phí các tháng trong năm (Triệu VNĐ)</p>
            </div>
            <span className="text-xs bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-xl border border-amber-200/60">
              Năm 2026
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  formatter={(val: number) => [`${val} Trđ`, 'Doanh Thu']}
                  contentStyle={{
                    borderRadius: '12px',
                    borderColor: '#f59e0b',
                    fontWeight: 600,
                  }}
                />
                <Bar dataKey="doanhThu" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-[#0d1b2a] text-base">Trạng Thái Học Phí 🎯</h3>
          </div>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val} học viên`, 'Số lượng']}
                  contentStyle={{ borderRadius: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Schedule & Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Lịch Học NS English</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium capitalize" id="today-date-text">
              {todayStr}
            </span>
          </div>

          <div id="dashboard-schedule-list" className="space-y-3">
            {classes.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Chưa có thông tin lớp học. Hãy tạo lớp học mới!
              </div>
            ) : (
              classes.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-2.5 h-10 rounded-full bg-amber-500 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm truncate">
                        {c.code} - {c.course}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{c.schedule} | {c.room}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-slate-700 shrink-0 ml-2">
                    {c.teacher}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Học Viên Gần Đây</h3>
            </div>
            <button
              onClick={onNavigateToStudents}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700"
            >
              Xem tất cả →
            </button>
          </div>

          <div id="dashboard-recent-students" className="space-y-3">
            {students.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Chưa có học viên nào. Nhấn "Thêm Học Viên" để bắt đầu.
              </div>
            ) : (
              students
                .slice(-4)
                .reverse()
                .map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                        <p className="text-xs text-slate-500">Lớp: {s.classCode || 'Chưa xếp'}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">{s.joinDate}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
