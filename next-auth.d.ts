import 'next-auth';
import { IdpwaUser } from '@/types/IdpwaUser';

// declare module 'next-auth' {
//   interface Session {
//     user: IdpwaUser;
//   }
//   interface JWT {
//     user: IdpwaUser;
//   }
// }