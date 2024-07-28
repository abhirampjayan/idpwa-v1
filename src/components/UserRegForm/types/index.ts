import { validationSchema } from '../utils/validator';
import * as z from 'zod';

export type RegisterFormData = z.infer<typeof validationSchema>;

export type RegisterPageProps = {
  id: string;
  phoneNumber: string;
};
