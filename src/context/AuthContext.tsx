import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { ContextType, User } from "@/types"
import { getCurrentUser } from "@/lib/appwrite/api"
import { useNavigate } from "react-router-dom"

export const INITIAL_USER = {
  id: "",
  username: "",
  email: "",
  name: "",
  imageUrl: "",
  bio: "",
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<ContextType>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>(INITIAL_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser()
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          username: currentAccount.username,
          email: currentAccount.email,
          name: currentAccount.name,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    } finally {
      setIsLoading(false)
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }

  useEffect(() => {
    if (localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null) {
      navigate('/sign-in')
    }
    checkAuthUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useUserContext = () => useContext(AuthContext)

export default AuthProvider;