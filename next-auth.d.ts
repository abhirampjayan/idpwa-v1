import IdpwaUser from '@/models/IdpwaUser';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: IdpwaUser;
  }
  interface JWT {
    user: IdpwaUser;
  }
}
