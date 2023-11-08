import PostCard from "@/components/Cards/PostCard"
const Home = () => {
  return (
    <div className="custom-scrollbar flex flex-1 flex-col items-center gap-10 px-5 py-10 md:px-8 lg:p-14">
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
