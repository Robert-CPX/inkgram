import PostForm from "@/components/Forms/PostForm"
const CreatePost = () => {

  return (
    <div className="custom-scrollbar mx-4 flex w-full flex-1 flex-col justify-start gap-2 lg:p-14">
      <div className="mt-6 flex items-center gap-2">
        <img src="/assets/icons/add-post.svg" alt="create post" width={36} height={36} />
        <h2 className="h3-bold md:h2-bold w-full text-left">Create Post</h2>
      </div>
      <PostForm action="Create" />
    </div>
  )
}

export default CreatePost
