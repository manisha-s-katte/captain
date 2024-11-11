'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'


type FormData = {
  username: string
  password: string
}

export default function Settings({email}:{email:string}) {
  const form = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmitUsername = async (data: FormData) => {
    try {
      fetch('/api/user/changeUser',{
        method:"POST",
        body:JSON.stringify({
          "email": email,
          "userName":data.username
        })
      })
      console.log('Password changed:', data.password)
      toast.success('Password updated successfully!')
    } catch (error) {
      console.error('Error updating username:', error)
      toast.error('Failed to update username. Please try again.')
    }
  }

  const onSubmitPassword = async (data: FormData) => {
    
    try {
      fetch('/api/user/changePassword',{
        method:"POST",
        body:JSON.stringify({
          "email": email,
          "newPassword":data.password
        })
      })
      console.log('Password changed:', data.password)
      toast.success('Password updated successfully!')
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error('Failed to update password. Please try again.')
    }
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-tr from-[#3A0153] to-[#1D022A] py-16">
      <div className="container flex flex-col items-center">
        <Link href="/" className="self-start">
          <Button variant="ghost" className="text-white">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <Card className="mt-8 w-full max-w-md border-2 border-[#D700E1]">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Update your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="New Username" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your new username here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmitUsername)}
                >
                  Update Username
                </Button>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your new password here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmitPassword)}
                >
                  Update Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}