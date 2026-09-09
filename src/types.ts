export type Role = 'admin' | 'ctv';

export interface UserAccount {
  username: string;
  password: string;
  name: string;
  role: Role;
}

export type TuitionStatus = 'Paid' | 'Pending' | 'Overdue';

export interface Student {
  id: string;
  name: string;
  dob: string;
  gender: 'Nam' | 'Nữ';
  phone: string;
  email: string;
  classCode: string;
  tuitionStatus: TuitionStatus;
  joinDate: string;
  notes?: string;
}

export interface ClassItem {
  code: string;
  course: string;
  teacher: string;
  schedule: string;
  room: string;
  fee: number;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent';

// Key: `${classCode}_${date}` -> { [studentId]: AttendanceStatus }
export type AttendanceRecords = Record<string, Record<string, AttendanceStatus>>;

export interface GradeRecord {
  listening: string | number;
  speaking: string | number;
  reading: string | number;
  writing: string | number;
  comment: string;
}

// Key: studentId -> GradeRecord
export type GradebookRecords = Record<string, GradeRecord>;

export type ActiveTab = 'dashboard' | 'students' | 'classes' | 'attendance' | 'tuition' | 'gradebook' | 'ctv';
