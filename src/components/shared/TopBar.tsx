import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/tanstack-query/queriesAndMutations"
import { useEffect } from "react"
import { useUserContext } from "@/context/AuthContext"

const TopBar = () => {
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount()
  const { user } = useUserContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) { navigate(0) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <section className="topbar">
      <div className="flex-between px-5 py-4">
        <Link to="/" className="flex items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={130} height={325} />
        </Link>
        <div className="flex gap-4">
          <Button variant='ghost' className="shad-button_ghost" onClick={() => signOut}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user?.id}`} className="flex-center">
            <img src={user.imageUrl || 'assets/images/profile-placeholer.svg'} alt="profile" className="h-8 w-8 rounded-full" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar
