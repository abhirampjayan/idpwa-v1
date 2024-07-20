import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';

type Props = {};

const DatePicker = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className='w-full'>
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          initialFocus
        />{' '}
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
