import { Models } from "appwrite";
import { Link, useNavigate } from "react-router-dom";

import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "../shared/PostStats";
import { Button } from "../ui/button";
import { useDeletePost } from "@/lib/tanstack-query/queriesAndMutations";

type PostDetailCardProps = {
  post: Models.Document;
};

const PostDetailCard = ({ post }: PostDetailCardProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutate: deletePost } = useDeletePost();

  if (!post.creator) return;

  const handleDelete = async () => {
    deletePost({ postId: post.$id, imageId: post.imageId });
    navigate(-1)
  }

  return (
    <div className="flex w-full max-w-5xl flex-col rounded-3xl bg-dark-3 p-5 lg:p-7 xl:flex-row">
      <img
        src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="post image"
        className="h-80 rounded-t-[30px] bg-dark-1 object-cover p-5 lg:h-[480px] xl:w-[48%] xl:rounded-l-[24px] xl:rounded-tr-none"
      />
      <div className="flex w-full flex-col lg:justify-between">
        <div className="flex flex-col">
          <div className="flex-between">
            <div className="flex items-center gap-3">
              <img
                src={post.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="creator"
                className="w-12 rounded-full lg:h-12"
              />
              <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                  {post.creator.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular ">
                    {multiFormatDateString(post.$createdAt)}
                  </p>
                  •
                  <p className="subtle-semibold lg:small-regular">
                    {post.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button onClick={handleDelete} className={`${user.id !== post.creator.$id && "hidden"}`}>
                <img src="/assets/icons/delete.svg" alt="delete" width={20} height={20} />
              </Button>
              <Link
                to={`/update-post/${post.$id}`}
                className={`${user.id !== post.creator.$id && "hidden"}`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
          <div className="my-4 h-[1px] w-full bg-dark-4" />
          <div className="small-medium lg:base-medium">
            <p>{post.caption}</p>
            <ul className="my-2 flex gap-1">
              {post.tags.map((tag: string, index: string) => (
                <li key={`${tag}${index}`} className="small-regular text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <PostStats post={post} userId={user.id} />
      </div>
    </div>
  );
};

export default PostDetailCard;