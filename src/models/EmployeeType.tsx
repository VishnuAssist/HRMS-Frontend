export type RoleType = 'admin' | 'basic';

export interface EmployeeType {
  id: number;

  age: number;
  role: RoleType;

  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  phoneNumber?: string;
  
}
