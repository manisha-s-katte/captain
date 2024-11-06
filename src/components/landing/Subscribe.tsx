'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Form schema
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const Subscribe = () => {
  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values:z.infer<typeof formSchema>) => {
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email: values.email
        })
      })
      form.reset()
    } catch (error) {
      console.error('Subscription error:', error)
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#14021D] to-[#60078C] p-4 ">
      <div className="pt-[100px] pb-[100px] flex flex-col items-center">
        <h1 className="text-white view_all text-4xl sm:text-5xl md:text-6xl font-semibold mb-16 text-center tracking-tighter">
          Subscribe for More Updates
        </h1>
        
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row items-center sm:gap-6 w-full max-w-md"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter Email Address"
                      className="bg-transparent border-b-2 border-t-0 border-x-0 border-[#D600E1] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="relative view_all text-white px-6 py-2 text-base sm:text-[1.2em] font-semibold mt-4 sm:mt-0 bg-[#D600E1] hover:bg-[#b000bb] "
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Subscribe