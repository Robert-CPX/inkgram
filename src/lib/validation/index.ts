"use client"

import * as z from "zod"

export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Name at least 2 characters' }).max(50),
  username: z.string().min(2, { message: 'username at least 2 characters' }).max(50),
  email: z.string().email(),
  password: z.string().min(8, { message: 'password should at least 8 characters' }).max(50),
})

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
})

export const CreatePostValidation = z.object({
  caption: z.string().min(5, { message: 'Caption at least 5 characters' }).max(2200),
  file: z.custom<File[]>(),
  location: z.string().optional(),
  tags: z.string().optional(),
})
