'use server';

import { signIn } from '@/auth';

export default async function signWithGoogle() {
  await signIn('google', { redirectTo: '/' });
}
