'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useState } from 'react';

const cities = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Other',
];
const ageOptions = [
  'Below 18',
  '18 - 25',
  '26 - 35',
  '36 - 45',
  '45 - 60',
  '60 and above',
];

// Schema
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z
    .string()
    .min(10, 'Enter valid phone')
    .regex(/^[+]?[0-9\s\-()]+$/, 'Invalid number'),
  email: z.string().email('Enter valid email'),
  company: z.string().optional(),
  linkedin: z.string().optional(),
  age: z.string().min(1, 'Age is required'),
  city: z.string().min(1, 'City is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [customCity, setCustomCity] = useState('');
  const [isOtherCity, setIsOtherCity] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      linkedin: '',
      age: '',
      city: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        router.push('/thank-you');
      } else {
        setSubmitError('Something went wrong.');
        console.error('Submission failed:', result.error);
      }
    } catch (error) {
      setSubmitError('Failed to submit. Try again.');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4 w-full max-w-2xl mx-auto text-black bg-[#f8e4d2] p-6 rounded-md'
      >
        <FormField
          name='firstName'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='First Name'
                  className='bg-[#f8e4d2] text-black border border-black'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='lastName'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Last Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Last Name'
                  className='bg-[#f8e4d2] text-black border border-black'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='name@example.com'
                  className='bg-[#f8e4d2] text-black border border-black'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name='phone'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='+91...'
                  className='bg-[#f8e4d2] text-black border border-black'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name='linkedin'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='https://linkedin.com/in/yourname'
                  className='bg-[#f8e4d2] text-black border border-black'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name='company'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Company name'
                  className='bg-[#f8e4d2] text-black border border-black'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name='age'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='bg-[#f8e4d2] text-black border border-black'>
                    <SelectValue placeholder='Select Age' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-gray-900 text-[#f8e4d2] max-h-60 overflow-y-auto'>
                  {ageOptions.map((age) => (
                    <SelectItem key={age} value={age}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name='city'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val === 'Other' ? customCity : val);
                  setIsOtherCity(val === 'Other');
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className='bg-[#f8e4d2] text-black border border-black '>
                    <SelectValue placeholder='Select city'   />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-gray-900 text-[#f8e4d2]'>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isOtherCity && (
                <div className='mt-2'>
                  <FormField
                    name='company'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>other</FormLabel>

                        <Input
                          value={customCity}
                          onChange={(e) => {
                            setCustomCity(e.target.value);
                            setValue('city', e.target.value);
                          }}
                          placeholder='Enter your city'
                          className='bg-[#f8e4d2] text-black border border-black'
                        />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-[#ff8bd0] hover:bg-[#eca2cf] text-[#f8e4d2] font-bold py-3 rounded-md'
        >
          {isSubmitting ? 'joining the club...' : 'Join the club'}
        </Button>

        {submitError && (
          <p className='text-red-400 text-sm mt-2'>{submitError}</p>
        )}
      </form>
    </Form>
  );
}
