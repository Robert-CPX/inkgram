import { sidebarLinks } from "@/constants"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/tanstack-query/queriesAndMutations"

const LeftsideMenu = () => {
  const { user } = useUserContext()
  const { pathname } = useLocation()
  const { mutateAsync: signOut } = useSignOutAccount()
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img src={user.imageUrl || 'assets/images/profile-placeholer.svg'} alt="profile" className="h-14 w-14 rounded-full" />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`} >
                <NavLink to={link.route} className='flex items-center gap-4 p-4'>
                  <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <Button variant='ghost' className="shad-button_ghost" onClick={() => signOut}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav >
  )
}

export default LeftsideMenu
