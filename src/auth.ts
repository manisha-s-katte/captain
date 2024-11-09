import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import prisma from './lib/prisma';
import Discord from 'next-auth/providers/discord'

export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [
    Credentials({
      name: 'Credentials',
      authorize: async (credentials) => {
        return credentials;
      },
    }),
    Discord({
      clientId:process.env.AUTH_DISCORD_ID,
      clientSecret:process.env.AUTH_DISCORD_SECRET,
      authorization: {
        params: {
          scope: 'identify email',
        },
      },
      token: "https://discord.com/api/oauth2/token",
      userinfo: "https://discord.com/api/users/@me",
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber =
            profile.discriminator === "0"
              ? Number(BigInt(profile.id) >> BigInt(22)) % 6
              : parseInt(profile.discriminator) % 5
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png"
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
        }
        
        return {
          id: profile.id,
          name: profile.global_name ?? profile.username,
          email: profile.email,
          image: profile.image_url,
        }
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
      console.log('Sign in attempt:', { user, account });
      
      if (account?.provider === 'google' || account?.provider === 'discord') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          if (existingUser) {
            // User exists, but hasn't used this provider to sign in before
            if (
              (account.provider === 'google' && !existingUser.googleId) ||
              (account.provider === 'discord' && !existingUser.discordId)
            ) {
              await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  ...(account.provider === 'google' && { googleId: user.id }),
                  ...(account.provider === 'discord' && { discordId: user.id }),
                  role: 'user',
                },
              });
            }
          } else {
            // New user, create an account
            await prisma.user.create({
              data: {
                email: user.email as string,
                name: user.name as string,
                ...(account.provider === 'google' && { googleId: user.id }),
                ...(account.provider === 'discord' && { discordId: user.id }),
              },
            });
          }
          return true; // Allow sign in
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false; // Prevent sign in on error
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