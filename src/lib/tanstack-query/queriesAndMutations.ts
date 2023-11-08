import { NewPost, NewUser, UpdatePost } from '@/types'
import {
  useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query'
import { createPost, createUserAccount, getRecentPosts, signInWithEmail, signOutAccount, likePost, savePost, deleteSavedPost, getCurrentUser, getPostById, updatePost, deletePost } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  })
}

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

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: UpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id] })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string, imageId: string }) => deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
    }
  })
}

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, userIds }: { postId: string, userIds: string[] }) => likePost(postId, userIds),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] })
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string, userId: string }) => savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] })
    }
  })
}

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: string) => deleteSavedPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] })
    }
  })
}