import type { User } from 'next-auth';

export interface CustomUser extends User {
  role?: string;
  email?: string;
  id?: string;
}
