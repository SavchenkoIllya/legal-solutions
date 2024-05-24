export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isVerified?: boolean;
}

export type UserFormData = Omit<User, "id" | "isVerified">