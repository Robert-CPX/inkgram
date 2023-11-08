import BottomBar from "@/components/shared/BottomBar"
import LeftsideMenu from "@/components/shared/LeftsideMenu"
import RightsideMenu from "@/components/shared/RightsideMenu"
import TopBar from "@/components/shared/TopBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <main className="w-full md:flex">
      <TopBar />
      <LeftsideMenu />
      <section className='flex h-full flex-1 overflow-scroll'>
        <Outlet />
      </section>
      <RightsideMenu />
      <BottomBar />
    </main>
  )
}

export default RootLayout
