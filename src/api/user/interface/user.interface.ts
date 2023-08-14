export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date | number;
  updatedAt: Date | number;
}
