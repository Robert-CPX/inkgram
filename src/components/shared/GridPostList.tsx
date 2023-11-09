import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid w-full max-w-5xl grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <li key={post.$id} className="relative h-80 min-w-[80px]">
          <Link to={`/posts/${post.$id}`} className="flex h-full w-full cursor-pointer overflow-hidden rounded-[24px] border border-dark-4">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="flex-between absolute bottom-0 w-full gap-2 rounded-b-[24px] bg-gradient-to-t from-dark-3 to-transparent p-5">
            {showUser && (
              <div className="flex flex-1 items-center justify-start gap-2">
                <img
                  src={
                    post.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="h-8 w-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;