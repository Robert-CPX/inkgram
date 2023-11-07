import PostCard from "@/components/Cards/PostCard"

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      {[1, 2, 3, 4].map((_, index) => (
        <PostCard
          key={index}
          userPic="https://picsum.photos/200"
          name="John Doe"
          username="@johndoe"
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quae."
          postPicUrl="https://picsum.photos/500"
          tags={["tag1", "tag2", "tag3"]}
          likes={100}
          isLiked={false}
          isCollected={false}
        />
      ))}
    </div>
  )
}

export default Home
