import UserCard from "../Cards/UserCard"

const RightsideMenu = () => {
  return (
    <aside className="sticky right-0 top-0 flex h-screen w-[330px] flex-col justify-start max-lg:hidden">
      <h2>Top Creators</h2>
      <div className="mt-5 flex w-full flex-wrap justify-start gap-3">
        {[1, 2, 3, 4].map((_, index) => (
          <UserCard
            key={index}
            imageUrl="https://picsum.photos/200"
            name="John Doe"
            username="@johndoe"
            isFollowed={false}
          />
        ))}
      </div>
    </aside>
  )
}

export default RightsideMenu
