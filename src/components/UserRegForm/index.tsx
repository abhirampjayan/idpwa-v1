import React from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import DatePicker from '../DatePicker';
import SelectGender from '../SelectGender';
import SelectBloodGroup from '../SelectBloodGroup';
import { RegisterPageProps } from './types';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

const UserRegForm = ({ phoneNumber }: RegisterPageProps) => {
  
  return (
    <div className='flex flex-col gap-8 mb-12'>
      <div className='flex flex-col gap-4 '>
        <h2 className='text-2xl'>Personal Details</h2>
        <Card className='grid p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div>
            <Label>Full name</Label>
            <Input type='text' />
          </div>
          <div>
            <Label>Email(Optional)</Label>
            <Input type='email' />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type='text' disabled value={phoneNumber} />
          </div>
          <div>
            <Label>WhatsApp Number</Label>
            <Input type='text' maxLength={10} />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <div>
              <DatePicker />
            </div>
          </div>
          <div>
            <Label>Gender</Label>
            <SelectGender />
          </div>
          <div>
            <Label>Father&apos;s Name(Optional)</Label>
            <Input />
          </div>
          <div>
            <Label>Mother&apos;s Name(Optional)</Label>
            <Input />
          </div>
          <div>
            <Label>Spouse(Optional)</Label>
            <Input />
          </div>
          <div>
            <Label>Blood Group</Label>
            <SelectBloodGroup />
          </div>
        </Card>
      </div>
      <div className='flex flex-col gap-4 '>
        <h2 className='text-2xl'>Firm Details (സ്ഥാപനത്തിന്റെ വിശദാംശങ്ങൾ)</h2>
        <Card className='grid p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div>
            <Label>Firm name</Label>
            <Input />
          </div>
          <div>
            <Label>Address Line 1</Label>
            <Input />
          </div>
          <div>
            <Label>Address Line 2(Optional)</Label>
            <Input />
          </div>
          <div>
            <Label>Taluk</Label>
            <Input />
          </div>
          <div>
            <Label>City</Label>
            <Input />
          </div>
          <div>
            <Label>District</Label>
            <Input />
          </div>
          <div>
            <Label>State</Label>
            <Input />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type='number' maxLength={10} />
          </div>
          <div>
            <Label>Alternate Phone Number(Optional)</Label>
            <Input type='number' maxLength={10} />
          </div>
          <div>
            <Label>Email(Optional)</Label>
            <Input type='email' />
          </div>
        </Card>
      </div>
      <div className='flex flex-col gap-4 '>
        <h2 className='text-2xl'>Home Address</h2>
        <Card className='grid p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div>
            <Label>Address Line 1</Label>
            <Input />
          </div>
          <div>
            <Label>Address Line 2(Optional)</Label>
            <Input />
          </div>
          <div>
            <Label>Taluk</Label>
            <Input />
          </div>
          <div>
            <Label>City</Label>
            <Input />
          </div>
          <div>
            <Label>District</Label>
            <Input />
          </div>
          <div>
            <Label>State</Label>
            <Input />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input />
          </div>
        </Card>
      </div>
      <div className=''>
        <div className='flex gap-4 text-slate-500 items-center'>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-5'
          >
            I agree to the{' '}
            <Link
              href='/terms-and-conditions'
              target='_blank'
              className='text-blue-600'
            >
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy-policy'
              target='_blank'
              className='text-blue-600'
            >
              Privacy Policy
            </Link>
            . I understand that by checking this box, I am giving my consent to
            the collection, use, and processing of my personal information as
            described in these documents.
          </label>
        </div>
      </div>
      <div className='flex justify-end'>
        <Button>Confirm & Register</Button>
      </div>
    </div>
  );
};

export default UserRegForm;
