import PostForm from "@/components/Forms/PostForm"
import { useGetPostById } from "@/lib/tanstack-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
const EditPost = () => {
  const params = useParams();
  const postId = params.id ?? '';
  const { data: post, isPending } = useGetPostById(postId)

  if (isPending) return (<Loader />)

  return (
    <div className="custom-scrollbar mx-4 flex w-full flex-1 flex-col justify-start gap-2 lg:p-14">
      <div className="mt-6 flex items-center gap-2">
        <img src="/assets/icons/add-post.svg" alt="create post" width={36} height={36} />
        <h2 className="h3-bold md:h2-bold w-full text-left">Edit Post</h2>
      </div>
      <PostForm action="Update" post={post} />
    </div>
  )
}

export default EditPost