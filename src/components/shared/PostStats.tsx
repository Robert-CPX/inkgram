import React, { useEffect, useState } from 'react';
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/tanstack-query/queriesAndMutations';
import { Models } from 'appwrite';
import { useLocation } from 'react-router-dom';

type PostStatsProps = {
  post: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation()
  const likeList = post.likes.map((user: Models.Document) => user.$id)
  const [likes, setLikes] = useState<string[]>(likeList)
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: savePost } = useSavePost()
  const { mutate: deleteSavedPost } = useDeleteSavedPost()

  const { data: currentUser } = useGetCurrentUser()

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser])

  const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()

    let likesArray = [...likes]

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((id) => id !== userId)
    } else {
      likesArray.push(userId)
    }
    setLikes(likesArray)
    console.log(likesArray)
    likePost({ postId: post.$id, userIds: likesArray })
  }

  const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()

    if (savedPostRecord) {
      setIsSaved(false)
      return deleteSavedPost(savedPostRecord.$id)
    }
    savePost({ postId: post.$id, userId })
    setIsSaved(true)
  }

  const containerStyles = location.pathname.startsWith('/profile') ? 'w-full' : ''

  return (
    <div className={`z-20 flex items-center justify-between ${containerStyles}`}>
      <div className='mr-5 flex gap-2'>
        <img src={`/assets/icons/${likes.includes(userId) ? "liked.svg" : "like.svg"}`} alt="like" width={20} height={20} onClick={handleLikePost} className='cursor-pointer' />
        <p className='small-medium lg:base-medium'>{likes.length}</p>
      </div>
      <div className='flex gap-2'>
        <img src={`/assets/icons/${isSaved ? "saved.svg" : "save.svg"}`} alt="save" width={20} height={20} onClick={handleSavePost} className='cursor-pointer' />
        <p className='small-medium lg:base-medium'>{post.save.length}</p>
      </div>
    </div>
  )
}

export default PostStats
