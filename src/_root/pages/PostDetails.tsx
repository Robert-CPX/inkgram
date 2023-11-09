import PostDetailCard from "@/components/Cards/PostDetailCard"
import Loader from "@/components/shared/Loader"
import { useGetPostById } from "@/lib/tanstack-query/queriesAndMutations"
import { useParams } from "react-router-dom"

const PostDetails = () => {
  const { id } = useParams()
  const { data: post, isPending, isError, error } = useGetPostById(id || "")

  return (
    <div className="custom-scrollbar flex min-w-[80%] flex-col items-center p-10 lg:px-20">
      {isPending && !post ? (
        <Loader />
      ) : (
        (isError || !post) ? (
          <p>{error?.message}</p>
        ) : (
          <PostDetailCard post={post} />
        )
      )
      }
    </div>
  )
}

export default PostDetails
