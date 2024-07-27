import { getAuth } from 'firebase-admin/auth';
import NextAuth, { User, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import admin from '@/lib/firebase-auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'firebase-phone',
      name: 'Firebase Phone',
      type: 'credentials',
      credentials: {
        idToken: { type: 'text' },
      },
      authorize: async (
        credentials: Record<'idToken', string> | undefined
      ): Promise<User | null> => {
        if (!credentials) return null;
        const { idToken } = credentials;
        if (!idToken) return null;
        try {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          const userId = decodedToken.uid;

          // Check if the user exists in your Firestore database
          const userDoc = await admin
            .firestore()
            .collection('users')
            .doc(userId)
            .get();

          if (!userDoc.exists) {
            // If the user doesn't exist, return a user object with isNewUser flag
            return {
              id: userId,
              phoneNumber: decodedToken.phone_number,
              isNewUser: true,
            } as User;
          }

          const userData = userDoc.data();

          const user = {
            id: userId,
            phoneNumber: decodedToken.phone_number,
            name: userData?.name,
            email: userData?.email,
            address: userData?.address,
            age: userData?.age,
            exp: decodedToken.exp,
            isNewUser: false,
          } as User;

          return user;
        } catch (error) {
          console.error('Error in authorization:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour default
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        token.name = user.name;
        token.email = user.email;
        token.address = user.address;
        token.age = user.age;
        token.exp = user.exp;
        token.isNewUser = user.isNewUser;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.address = token.address as string;
        session.user.age = token.age as number;
        session.user.isNewUser = token.isNewUser as boolean;
      }

      if (token.exp) {
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the user is new, redirect to the register page
      if (url.startsWith(baseUrl)) {
        const urlObj = new URL(url);
        const isNewUser = urlObj.searchParams.get('isNewUser');
        if (isNewUser === 'true') {
          return `${baseUrl}/register`;
        }
      }
      return url;
    },
  },
};

export default NextAuth(authOptions);