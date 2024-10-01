import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import prisma from './lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      authorize: async (credentials) => {
        return credentials;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (existingUser) {
          // User exists, but hasn't used Google to sign in before
          if (!existingUser.googleId) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { googleId: user.id },
            });
          }
          return true; // Allow sign in
        } else {
          // New user, create an account
          await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name as string,
              googleId: user.id as string,
            },
          });
          return true; // Allow sign in
        }
      }
      return true; // Allow sign in for other providers
    },
    async jwt({ token, user, account }) {
      if (user && 'name' in user && 'email' in user && 'id' in user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).name = token.name as string;
        (session.user as any).email = token.email as string;
        (session.user as any).id = token.id as number;
        (session.user as any).provider = token.provider as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 10,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 10,
  },

  pages: {
    signIn: '/login',
  },
});
