// import { User } from "firebase/auth";

// export interface IdpwaUser extends User{
//   uid: string;
//   phoneNumber: string;
//   alternatePhoneNumber?: string;
//   isNewUser: boolean;
//   name?: string;
//   age?: number;
//   firmName?: string;
//   firmAddress?: {
//     address: string;
//     city: string;
//     state: string;
//     pincode: string;
//   };
//   HomeAddress?: {
//     address: string;
//     city: string;
//     state: string;
//     pincode: string;
//   };
//   taluk?: string;
//   district?: string;
//   state?: string;
//   CO?: string;
// }

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}
