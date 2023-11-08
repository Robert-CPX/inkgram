import { NewPost, NewUser } from '@/types'
import {
  useMutation, useQueryClient,
} from '@tanstack/react-query'
import { createPost, createUserAccount, signInWithEmail, signOutAccount } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'

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

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: NewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
    }
  })
}