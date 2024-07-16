import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import NextAuth, { RequestInternal, User, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FirestoreAdapter from '@/lib/FirestoreAdapter';

export const authOptions: AuthOptions = {
  adapter: FirestoreAdapter(),
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
        console.log('\n\n================authorize============\n\n');

        if (!credentials) return null;
        const { idToken } = credentials;
        if (!idToken) return null;

        try {
          const decodedToken = await getAuth().verifyIdToken(idToken);
          const uid = decodedToken.uid;
          // const db = getFirestore();
          // console.log('\n\n================calling firestore============\n\n');

          // const userDoc = await db.collection('users').doc(uid).get();

          // let user: User;

          // if (userDoc.exists) {
          //   console.log('\n\n================User exists============\n\n');

          //   // User exists, return user data
          //   const userData = userDoc.data() as Omit<User, 'id'>;
          //   user = {
          //     id: uid,
          //     ...userData,
          //   };
          // } else {
          //   // New user, return basic info
          //   console.log('\n\n================User not exists============\n\n');

          //   user = {
          //     id: uid,
          //     name: null,
          //     email: null,
          //     image: null,
          //   };
          // }

          // console.log('\n\n================User============\n\n', user);

          const user = {
            id: uid,
            name: null,
            email: null,
            image: null,
            phoneNumber: decodedToken.phone_number,
            isNewUser: true,
          };

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
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phoneNumber = token.phoneNumber as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
