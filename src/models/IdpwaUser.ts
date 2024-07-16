import { Address } from '@/types/common';

export default interface IdpwaUser {
  uid: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  isNewUser: boolean;
  email: string;
  name?: string;
  age?: number;
  firmName?: string;
  firmAddress?: Address;
  HomeAddress?: Address;
  taluk?: string;
  district?: string;
  state?: string;
  FatherName?: string;
  MotherName?: string;
  HusbandName?: string;
}
