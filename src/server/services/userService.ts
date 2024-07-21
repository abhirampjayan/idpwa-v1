import admin, { db } from '@/lib/firebase-auth';
import IdpwaUser from '@/models/IdpwaUser';

export const userService = {
  async createUser(
    userData: Omit<IdpwaUser, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<IdpwaUser> {
    const userRef = db.collection('users').doc(userData.phoneNumber);
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    const newUser = {
      ...userData,
      createdAt: timestamp,
      updatedAt: timestamp,
    } as unknown as IdpwaUser;
    await userRef.set(newUser);
    return newUser;
  },

  async getUserById(userId: string): Promise<IdpwaUser | null> {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) return null;
    return userDoc.data() as IdpwaUser;
  },
};
