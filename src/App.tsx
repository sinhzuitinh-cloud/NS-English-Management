import { useState, useEffect, useCallback } from 'react';
import {
  UserAccount,
  Student,
  ClassItem,
  AttendanceRecords,
  GradebookRecords,
  ActiveTab,
  AttendanceStatus,
} from './types';
import {
  getStoredAccounts,
  saveStoredAccounts,
  getStoredStudents,
  saveStoredStudents,
  getStoredClasses,
  saveStoredClasses,
  getStoredAttendance,
  saveStoredAttendance,
  getStoredGrades,
  saveStoredGrades,
  getStoredCurrentUser,
  saveStoredCurrentUser,
  SAMPLE_CLASSES,
  SAMPLE_STUDENTS,
} from './storage';

import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import StudentsView from './components/StudentsView';
import ClassesView from './components/ClassesView';
import AttendanceView from './components/AttendanceView';
import TuitionView from './components/TuitionView';
import GradebookView from './components/GradebookView';
import CTVView from './components/CTVView';

import StudentModal from './components/modals/StudentModal';
import StudentDetailModal from './components/modals/StudentDetailModal';
import ClassModal from './components/modals/ClassModal';
import CTVModal from './components/modals/CTVModal';
import Toast, { ToastMessage } from './components/Toast';

export default function App() {
  // Authentication & Accounts
  const [accounts, setAccounts] = useState<UserAccount[]>(getStoredAccounts);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(getStoredCurrentUser);

  // Core Data
  const [students, setStudents] = useState<Student[]>(getStoredStudents);
  const [classes, setClasses] = useState<ClassItem[]>(getStoredClasses);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecords>(getStoredAttendance);
  const [gradebookRecords, setGradebookRecords] = useState<GradebookRecords>(getStoredGrades);

  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modals
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [isStudentDetailModalOpen, setIsStudentDetailModalOpen] = useState(false);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isCTVModalOpen, setIsCTVModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    saveStoredAccounts(accounts);
  }, [accounts]);

  useEffect(() => {
    saveStoredStudents(students);
  }, [students]);

  useEffect(() => {
    saveStoredClasses(classes);
  }, [classes]);

  useEffect(() => {
    saveStoredAttendance(attendanceRecords);
  }, [attendanceRecords]);

  useEffect(() => {
    saveStoredGrades(gradebookRecords);
  }, [gradebookRecords]);

  // Auth Handlers
  const handleLoginSuccess = (user: UserAccount, remember: boolean) => {
    setCurrentUser(user);
    if (remember) {
      saveStoredCurrentUser(user);
    }
    showToast(`Chào mừng ${user.name}! 🌟`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveStoredCurrentUser(null);
    setActiveTab('dashboard');
    showToast('Đã đăng xuất khỏi hệ thống', 'info');
  };

  // Student Actions
  const handleOpenAddStudent = () => {
    setStudentToEdit(null);
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudent = (student: Student) => {
    setStudentToEdit(student);
    setIsStudentModalOpen(true);
  };

  const handleOpenDetailStudent = (student: Student) => {
    setSelectedStudentForDetail(student);
    setIsStudentDetailModalOpen(true);
  };

  const handleSaveStudent = (data: Partial<Student>) => {
    if (studentToEdit) {
      // Update
      setStudents((prev) =>
        prev.map((s) => (s.id === studentToEdit.id ? ({ ...s, ...data } as Student) : s))
      );
      showToast('Đã cập nhật thông tin học viên');
    } else {
      // Add
      const newId = `NS-${Math.floor(Math.random() * 899) + 100}`;
      const newStudent: Student = {
        id: newId,
        name: data.name || '',
        dob: data.dob || '',
        gender: data.gender || 'Nam',
        phone: data.phone || '',
        email: data.email || '',
        classCode: data.classCode || (classes[0]?.code ?? ''),
        tuitionStatus: data.tuitionStatus || 'Pending',
        joinDate: new Date().toISOString().split('T')[0],
        notes: data.notes || '',
      };
      setStudents((prev) => [...prev, newStudent]);
      showToast('Đã thêm học viên mới thành công');
    }
    setIsStudentModalOpen(false);
  };

  const handleDeleteStudent = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa học viên "${name}" khỏi hệ thống?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast(`Đã xóa học viên ${name}`, 'error');
    }
  };

  // Class Actions
  const handleSaveClass = (newClass: ClassItem) => {
    const existing = classes.find((c) => c.code.toUpperCase() === newClass.code.toUpperCase());
    if (existing) {
      showToast('Mã lớp học này đã tồn tại!', 'error');
      return;
    }
    setClasses((prev) => [...prev, newClass]);
    setIsClassModalOpen(false);
    showToast(`Đã tạo lớp ${newClass.code} thành công`);
  };

  const handleDeleteClass = (code: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa lớp học "${code}"?`)) {
      setClasses((prev) => prev.filter((c) => c.code !== code));
      showToast(`Đã xóa lớp học ${code}`, 'error');
    }
  };

  // Attendance Actions
  const handleSaveAttendance = (
    classCode: string,
    date: string,
    statuses: Record<string, AttendanceStatus>
  ) => {
    const key = `${classCode}_${date}`;
    setAttendanceRecords((prev) => ({
      ...prev,
      [key]: statuses,
    }));
    showToast(`Đã lưu điểm danh lớp ${classCode} (${date})`);
  };

  // Gradebook Actions
  const handleUpdateGrade = (
    studentId: string,
    field: 'listening' | 'speaking' | 'reading' | 'writing' | 'comment',
    value: string | number
  ) => {
    setGradebookRecords((prev) => {
      const current = prev[studentId] || {
        listening: '',
        speaking: '',
        reading: '',
        writing: '',
        comment: '',
      };
      return {
        ...prev,
        [studentId]: {
          ...current,
          [field]: value,
        },
      };
    });
  };

  // Tuition Actions
  const handleToggleTuitionStatus = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        // Cycle: Paid -> Pending -> Overdue -> Paid
        const nextStatus =
          s.tuitionStatus === 'Paid'
            ? 'Pending'
            : s.tuitionStatus === 'Pending'
            ? 'Overdue'
            : 'Paid';
        showToast(`Đã cập nhật học phí ${s.name}: ${nextStatus}`, 'info');
        return { ...s, tuitionStatus: nextStatus };
      })
    );
  };

  // CTV Actions
  const handleSaveCTV = (newAccount: UserAccount) => {
    const existing = accounts.find(
      (a) => a.username.toLowerCase() === newAccount.username.toLowerCase()
    );
    if (existing) {
      showToast('Tên đăng nhập này đã tồn tại trong hệ thống!', 'error');
      return;
    }
    setAccounts((prev) => [...prev, newAccount]);
    setIsCTVModalOpen(false);
    showToast(`Đã cấp tài khoản CTV cho ${newAccount.name}!`);
  };

  const handleDeleteCTV = (username: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa tài khoản CTV "${username}"?`)) {
      setAccounts((prev) => prev.filter((a) => a.username !== username));
      showToast('Đã xóa tài khoản CTV', 'error');
    }
  };

  // Reset / Clear all data
  const handleClearAllData = () => {
    if (currentUser?.role !== 'admin') return;
    if (
      window.confirm(
        'Bạn có chắc chắn muốn xóa toàn bộ dữ liệu học viên, lớp học, điểm danh và bảng điểm về trạng thái trống?'
      )
    ) {
      setStudents([]);
      setClasses([]);
      setAttendanceRecords({});
      setGradebookRecords({});
      showToast('Đã xóa toàn bộ dữ liệu học viên và lớp học!', 'info');
    }
  };

  // Seed sample data for preview convenience
  const handleSeedSampleData = () => {
    setClasses(SAMPLE_CLASSES);
    setStudents(SAMPLE_STUDENTS);
    showToast('Đã nạp dữ liệu mẫu thử nghiệm thành công! 🌟');
  };

  // Tab switching guard for CTV
  const handleTabChange = (tab: ActiveTab) => {
    if (currentUser?.role === 'ctv' && (tab === 'tuition' || tab === 'ctv')) {
      showToast('Tài khoản CTV không có quyền truy cập mục này!', 'error');
      return;
    }
    setActiveTab(tab);
  };

  // If not logged in, render the login screen
  if (!currentUser) {
    return (
      <>
        <LoginScreen accounts={accounts} onLoginSuccess={handleLoginSuccess} />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  const hasData = students.length > 0 || classes.length > 0;

  return (
    <div id="app-layout" className="flex h-screen overflow-hidden bg-[#f7f9fc]">
      {/* Sidebar */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          activeTab={activeTab}
          currentUser={currentUser}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenAddStudent={handleOpenAddStudent}
          onClearAllData={handleClearAllData}
          onSeedSampleData={handleSeedSampleData}
          hasData={hasData}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[#f7f9fc]">
          {activeTab === 'dashboard' && (
            <DashboardView
              students={students}
              classes={classes}
              onNavigateToStudents={() => setActiveTab('students')}
            />
          )}

          {activeTab === 'students' && (
            <StudentsView
              students={students}
              classes={classes}
              onOpenAddModal={handleOpenAddStudent}
              onOpenEditModal={handleOpenEditStudent}
              onOpenDetailModal={handleOpenDetailStudent}
              onDeleteStudent={handleDeleteStudent}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'classes' && (
            <ClassesView
              classes={classes}
              students={students}
              onOpenAddClass={() => setIsClassModalOpen(true)}
              onDeleteClass={currentUser.role === 'admin' ? handleDeleteClass : undefined}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView
              classes={classes}
              students={students}
              attendanceRecords={attendanceRecords}
              onSaveAttendance={handleSaveAttendance}
            />
          )}

          {activeTab === 'tuition' && currentUser.role === 'admin' && (
            <TuitionView
              students={students}
              classes={classes}
              onToggleStatus={handleToggleTuitionStatus}
            />
          )}

          {activeTab === 'gradebook' && (
            <GradebookView
              classes={classes}
              students={students}
              gradebookRecords={gradebookRecords}
              onUpdateGrade={handleUpdateGrade}
            />
          )}

          {activeTab === 'ctv' && currentUser.role === 'admin' && (
            <CTVView
              accounts={accounts}
              onOpenAddCTVModal={() => setIsCTVModalOpen(true)}
              onDeleteCTV={handleDeleteCTV}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <StudentModal
        isOpen={isStudentModalOpen}
        studentToEdit={studentToEdit}
        classes={classes}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudent}
      />

      <StudentDetailModal
        isOpen={isStudentDetailModalOpen}
        student={selectedStudentForDetail}
        classes={classes}
        onClose={() => setIsStudentDetailModalOpen(false)}
      />

      <ClassModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        onSave={handleSaveClass}
      />

      <CTVModal
        isOpen={isCTVModalOpen}
        onClose={() => setIsCTVModalOpen(false)}
        onSave={handleSaveCTV}
      />

      {/* Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
