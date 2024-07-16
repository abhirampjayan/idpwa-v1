import admin, { db } from '@/lib/firebase-auth';
import IdpwaUser from '@/models/IdpwaUser';

export const userService = {
  async createUser(
    userData: Omit<IdpwaUser, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<IdpwaUser> {
    const userRef = db.collection('users').doc(userData.phoneNumber);
    const newUser = {
      ...userData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await userRef.set(newUser);
    return newUser as IdpwaUser;
  },

  async getUserById(userId: string): Promise<IdpwaUser | null> {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data() as IdpwaUser;
  },
};
