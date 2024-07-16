import {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from 'next-auth/adapters';
import admin from './firebase-auth';

const FirestoreAdapter = (): Adapter => {
  const db = admin.firestore();

  return {
    async createUser(user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> {
      const newUser = {
        ...user,
        id: admin.firestore().collection('users').doc().id,
      };
      await db.collection('users').doc(newUser.id).set(newUser);
      return newUser;
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      const doc = await db.collection('users').doc(id).get();
      return doc.exists ? ({ id, ...doc.data() } as AdapterUser) : null;
    },

    async getUserByAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }): Promise<AdapterUser | null> {
      const snapshot = await db
        .collection('accounts')
        .where('providerAccountId', '==', providerAccountId)
        .where('provider', '==', provider)
        .limit(1)
        .get();
      if (snapshot.empty) return null;
      const accountDoc = snapshot.docs[0];
      const userDoc = await db
        .collection('users')
        .doc(accountDoc.data().userId)
        .get();
      return userDoc.exists
        ? ({ id: userDoc.id, ...userDoc.data() } as AdapterUser)
        : null;
    },

    async updateUser(
      user: Partial<AdapterUser> & { id: string }
    ): Promise<AdapterUser> {
      const { id, ...userData } = user;
      await db.collection('users').doc(id).update(userData);
      const updatedDoc = await db.collection('users').doc(id).get();
      return { id, ...updatedDoc.data() } as AdapterUser;
    },

    async deleteUser(userId: string): Promise<void> {
      await db.collection('users').doc(userId).delete();
    },

    async linkAccount(account: AdapterAccount): Promise<AdapterAccount> {
      await db.collection('accounts').add(account);
      return account;
    },

    async unlinkAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }): Promise<void> {
      const snapshot = await db
        .collection('accounts')
        .where('providerAccountId', '==', providerAccountId)
        .where('provider', '==', provider)
        .limit(1)
        .get();
      if (!snapshot.empty) {
        await snapshot.docs[0].ref.delete();
      }
    },

    async createSession(session: AdapterSession): Promise<AdapterSession> {
      await db.collection('sessions').doc(session.sessionToken).set(session);
      return session;
    },

    async getSessionAndUser(
      sessionToken: string
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      const sessionDoc = await db
        .collection('sessions')
        .doc(sessionToken)
        .get();
      if (!sessionDoc.exists) return null;
      const session = sessionDoc.data() as AdapterSession;
      const userDoc = await db.collection('users').doc(session.userId).get();
      if (!userDoc.exists) return null;
      const user = { id: userDoc.id, ...userDoc.data() } as AdapterUser;
      return { session, user };
    },

    async updateSession(
      session: Partial<AdapterSession> & { sessionToken: string }
    ): Promise<AdapterSession> {
      await db.collection('sessions').doc(session.sessionToken).update(session);
      const updatedDoc = await db
        .collection('sessions')
        .doc(session.sessionToken)
        .get();
      return updatedDoc.data() as AdapterSession;
    },

    async deleteSession(sessionToken: string): Promise<void> {
      await db.collection('sessions').doc(sessionToken).delete();
    },
  };
};

export default FirestoreAdapter;
