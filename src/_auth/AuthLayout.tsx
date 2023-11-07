import { Outlet, Navigate } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext()

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 flex-col items-center justify-center py-10">
            <Outlet />
          </section>
          <img
            className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
            src="/assets/images/side-img.jpeg"
            alt="logo"
          />
        </>
      )}
    </>
  )
}

export default AuthLayout
