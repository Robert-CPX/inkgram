type UserCardProps = {
  imageUrl: string;
  name: string;
  username: string;
  isFollowed: boolean;
}

const UserCard = (props: UserCardProps) => {
  return (
    <section className="flex flex-col items-center justify-center rounded">
      <img src={props.imageUrl} alt="user" className="h-24 w-24 rounded-full" />
      <p className="text-sm font-semibold">{props.name}</p>
      <p className="text-sm font-semibold">{props.username}</p>
      <button className="rounded-full bg-blue-500 px-2 py-1 text-white">
        {props.isFollowed ? 'Following' : 'Follow'}
      </button>
    </section>
  )
}

export default UserCard
