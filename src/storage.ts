import { UserAccount, Student, ClassItem, AttendanceRecords, GradebookRecords } from './types';

export const DEFAULT_ADMIN: UserAccount = {
  username: 'nsenglish247',
  password: 'nsenglish247',
  name: 'Ban Quản Lý NS English',
  role: 'admin',
};

const STORAGE_KEYS = {
  STUDENTS: 'ns_standalone_students',
  CLASSES: 'ns_standalone_classes',
  ATTENDANCE: 'ns_standalone_attendance',
  GRADES: 'ns_standalone_grades',
  ACCOUNTS: 'ns_standalone_accounts',
  CURRENT_USER: 'ns_standalone_current_user',
  IS_AUTH: 'ns_standalone_is_auth',
};

export const getStoredAccounts = (): UserAccount[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    if (data) {
      const parsed: UserAccount[] = JSON.parse(data);
      if (!parsed.some((a) => a.username === DEFAULT_ADMIN.username)) {
        parsed.unshift(DEFAULT_ADMIN);
      }
      return parsed;
    }
  } catch {
    // fallback
  }
  return [DEFAULT_ADMIN];
};

export const saveStoredAccounts = (accounts: UserAccount[]) => {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
};

export const getStoredStudents = (): Student[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveStoredStudents = (students: Student[]) => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};

export const getStoredClasses = (): ClassItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CLASSES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveStoredClasses = (classes: ClassItem[]) => {
  localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
};

export const getStoredAttendance = (): AttendanceRecords => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveStoredAttendance = (attendance: AttendanceRecords) => {
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
};

export const getStoredGrades = (): GradebookRecords => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GRADES);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveStoredGrades = (grades: GradebookRecords) => {
  localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades));
};

export const getStoredCurrentUser = (): UserAccount | null => {
  try {
    const isAuth = localStorage.getItem(STORAGE_KEYS.IS_AUTH);
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (isAuth === 'true' && user) {
      return JSON.parse(user);
    }
  } catch {
    return null;
  }
  return null;
};

export const saveStoredCurrentUser = (user: UserAccount | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.IS_AUTH);
  }
};

// Seed sample data if user wishes to demo
export const SAMPLE_CLASSES: ClassItem[] = [
  {
    code: 'IE-65A',
    course: 'IELTS Intensive 6.5+',
    teacher: 'Mr. David Miller',
    schedule: 'T2 - T4 - T6 (18:00 - 19:30)',
    room: 'Phòng 101',
    fee: 5500000,
  },
  {
    code: 'COMM-02',
    course: 'Tiếng Anh Giao Tiếp Pro',
    teacher: 'Ms. Sarah Nguyễn',
    schedule: 'T3 - T5 - T7 (19:30 - 21:00)',
    room: 'Phòng 204',
    fee: 3800000,
  },
  {
    code: 'KIDS-STAR',
    course: 'Cambridge Starters & Movers',
    teacher: 'Teacher Alex & Trợ giảng Lan',
    schedule: 'Thứ 7 & CN (09:00 - 10:30)',
    room: 'Phòng Sunshine 01',
    fee: 3200000,
  },
];

export const SAMPLE_STUDENTS: Student[] = [
  {
    id: 'NS-101',
    name: 'Nguyễn Hoàng Long',
    dob: '2005-08-14',
    gender: 'Nam',
    phone: '0912 345 678',
    email: 'hoanglong.nguyen@gmail.com',
    classCode: 'IE-65A',
    tuitionStatus: 'Paid',
    joinDate: '2026-08-15',
    notes: 'Mục tiêu IELTS 7.0 để du học Úc',
  },
  {
    id: 'NS-102',
    name: 'Trần Thị Mai Phương',
    dob: '2006-03-22',
    gender: 'Nữ',
    phone: '0988 765 432',
    email: 'maiphuong.tran@gmail.com',
    classCode: 'IE-65A',
    tuitionStatus: 'Pending',
    joinDate: '2026-08-20',
    notes: 'Cần cải thiện kỹ năng Speaking',
  },
  {
    id: 'NS-103',
    name: 'Phạm Gia Bảo',
    dob: '2014-11-05',
    gender: 'Nam',
    phone: '0903 112 233',
    email: 'phuhuynh.giabao@gmail.com',
    classCode: 'KIDS-STAR',
    tuitionStatus: 'Paid',
    joinDate: '2026-08-28',
    notes: 'Học sinh rất hoạt ngôn, yêu thích kể chuyện',
  },
  {
    id: 'NS-104',
    name: 'Lê Thảo Vy',
    dob: '2000-01-19',
    gender: 'Nữ',
    phone: '0977 889 900',
    email: 'thaovy.le@gmail.com',
    classCode: 'COMM-02',
    tuitionStatus: 'Overdue',
    joinDate: '2026-08-10',
    notes: 'Đi làm theo ca, đã hẹn thanh toán cuối tuần',
  },
];
