type PostCardProps = {
  userPic: string;
  name: string;
  username: string;
  title: string;
  postPicUrl: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
  isCollected: boolean;
}
const PostCard = (props: PostCardProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <h3>{props.title}</h3>
      <div className="flex gap-1">
        {props.tags.map((tag, index) => (
          <span key={index} className="text-sm text-gray-400">{`#${tag}`}</span>
        ))}
      </div>
      <img src={props.postPicUrl} alt="post" className="w-full rounded-lg" />
      <div className="flex w-full justify-between">
      </div>
    </div>
  )
}

export default PostCard
