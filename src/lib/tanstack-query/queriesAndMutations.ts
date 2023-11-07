import { NewUser } from '@/types'
import {
  useMutation,
} from '@tanstack/react-query'
import { createUserAccount, signInWithEmail, signOutAccount } from '../appwrite/api'

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

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOutAccount()
  })
}