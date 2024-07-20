import { getAuth } from 'firebase-admin/auth';
import NextAuth, { User, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { firestore } from 'firebase-admin';

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
          const decodedToken = await getAuth().verifyIdToken(idToken);
          const userId = decodedToken.uid;

          // Check if the user exists in your Firestore database
          const userDoc = await firestore()
            .collection('users')
            .doc(userId)
            .get();

          if (!userDoc.exists) {
            // If the user doesn't exist, throw an error to redirect to sign-up
            return {
              id: decodedToken.uid,
              phoneNumber: decodedToken.phone_number,              isNewUser: true,

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
            exp: decodedToken.exp, // Add the expiration time from the token
          } as User;
          return user;
        } catch (error) {
          console.error('Error in authorization:', error);
          if (error instanceof Error && error.message === 'NEW_USER') {
            // Rethrow the error to be caught by NextAuth
            throw error;
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
    newUser: '/signup',
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
        token.exp = user.exp; // Set the expiration time in the token
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
      }

      // Set the session expiry based on the token expiration
      if (token.exp) {
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      return session;
    },
    signIn: async ({ user, account, profile }) => {
      try {
        return true;
      } catch (error) {
        return '/auth/error?error=User is not registered';
      }
    },
  },
};

export default NextAuth(authOptions);
