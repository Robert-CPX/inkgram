'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreatePostValidation } from "@/lib/validation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FileUploader from "../shared/FileUploader"
import { useCreatePost } from "@/lib/tanstack-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { Models } from "appwrite"
import Loader from "../shared/Loader"

type PostFormProps = {
  post?: Models.Document;
  action: 'Create' | 'Update';
}

const PostForm = ({ post, action }: PostFormProps) => {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const { mutateAsync: createPost, isPending: isCreatingPost } = useCreatePost()

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      caption: post ? post.caption : '',
      file: post ? post.file : [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(',') : "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreatePostValidation>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })
    if (!newPost) {
      toast({ title: "Something went wrong" })
    }
    navigate('/')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-9">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="h-12 border-none bg-dark-3 ring-offset-light-3 focus-visible:ring-1 focus-visible:ring-offset-1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Tags (separated by comman &quot; , &quot;)</FormLabel>
              <FormControl>
                <Input placeholder="Art, Expression, Learn" className="h-12 border-none bg-dark-3 ring-offset-light-3 focus-visible:ring-1 focus-visible:ring-offset-1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end gap-4">
          <Button type="button" className="flex bg-dark-4 px-5 text-light-1" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" className="flex bg-primary-500 text-light-1 hover:bg-primary-500" disabled={isCreatingPost}>
            {isCreatingPost && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
