import PostCard from "@/components/Cards/PostCard"
import Loader from "@/components/shared/Loader"
import { useGetRecentPosts } from "@/lib/tanstack-query/queriesAndMutations"
const Home = () => {
  const { isPending, isError, data, error } = useGetRecentPosts()
  return (
    <div className="custom-scrollbar flex w-full max-w-screen-sm flex-1 flex-col items-center gap-6 px-5 py-10 md:gap-9 md:px-8 lg:p-14">
      <h2 className="h3-bold md:h2-bold w-full text-left">Home Feed</h2>
      {isPending && !data ? (
        <Loader />
      ) : (
        isError ? (
          <p>{error?.message}</p>
        ) : (
          <ul className="flex w-full flex-col gap-9">
            {data?.documents.map((post, index) => (
              <li key={`${post.caption}-${index}`}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )
      )
      }
    </div>
  )
}

export default Home
