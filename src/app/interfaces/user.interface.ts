export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  company: string;
  department: string;
  password: string;
  password_confirm: string;
  is_admin: boolean;
  groups: number[];
}
