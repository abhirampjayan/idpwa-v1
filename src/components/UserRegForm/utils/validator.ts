import * as z from 'zod';

export const validationSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email().optional().or(z.literal('')),
  phoneNumber: z.string(),
  whatsappNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'WhatsApp number must be 10 digits' }),
  dateOfBirth: z.date(),
  gender: z.string().min(1, { message: 'Gender is required' }),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  spouse: z.string().optional(),
  bloodGroup: z.string().min(1, { message: 'Blood group is required' }),
  firmName: z.string().min(1, { message: 'Firm name is required' }),
  firmAddressLine1: z
    .string()
    .min(1, { message: 'Address line 1 is required' }),
  firmAddressLine2: z.string().optional(),
  firmTaluk: z.string().min(1, { message: 'Taluk is required' }),
  firmCity: z.string().min(1, { message: 'City is required' }),
  firmDistrict: z.string().min(1, { message: 'District is required' }),
  firmState: z.string().min(1, { message: 'State is required' }),
  firmPincode: z
    .string()
    .regex(/^\d{6}$/, { message: 'Pincode must be 6 digits' }),
  firmPhoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' }),
  firmAlternatePhoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' })
    .optional()
    .or(z.literal('')),
  firmEmail: z.string().email().optional().or(z.literal('')),
  homeAddressLine1: z
    .string()
    .min(1, { message: 'Address line 1 is required' }),
  homeAddressLine2: z.string().optional(),
  homeTaluk: z.string().min(1, { message: 'Taluk is required' }),
  homeCity: z.string().min(1, { message: 'City is required' }),
  homeDistrict: z.string().min(1, { message: 'District is required' }),
  homeState: z.string().min(1, { message: 'State is required' }),
  homePincode: z
    .string()
    .regex(/^\d{6}$/, { message: 'Pincode must be 6 digits' }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
});
