import type { User } from 'next-auth';

export interface CustomUser extends User {
  email?: string;
  id?: string;
}
