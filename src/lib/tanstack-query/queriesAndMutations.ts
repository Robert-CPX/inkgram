import { NewUser } from '@/types'
import {
  useMutation,
} from '@tanstack/react-query'
import { createUserAccount, signInWithEmail } from '../appwrite/api'

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user)
  })
}

export const useSigninWithEmailAccount = () => {
  return useMutation({
    mutationFn: (user: {
      email: string;
      password: string;
    }) => signInWithEmail(user)
  })
}