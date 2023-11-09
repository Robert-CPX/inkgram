import { Models } from "appwrite";
import PostStats from "../shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Models.Document;
};

const ExplorePostItem = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  if (!post) return;
  return (
    <Link to={`/posts/${post.$id}`}>
      <div className="w-full max-w-screen-sm overflow-hidden rounded-3xl border-none bg-dark-2">
        <img src={post.imageUrl} className="-z-10 h-full w-full object-cover" />
        <div className="flex h-[58px] items-center justify-between bg-gradient-to-t from-gray-400 to-transparent px-6">
          <div className="flex-center justify-start gap-2">
            <img src={post.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="avatar" height={28} width={28} className="rounded-full" />
            <p className="text-light-1">{post.creator.name}</p>
          </div>
          <div className="flex-center justify-end gap-1">
            <PostStats post={post} userId={user.id} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ExplorePostItem
