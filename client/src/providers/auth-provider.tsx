import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

interface IUser {
  fullname: string
  email: string
  username: string
  id: string
  profilePicture: string
}

export interface IAuthContext {
  user: null | IUser
  setUser: Dispatch<SetStateAction<IUser | null>>
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (localStorage.getItem('auth-user')) {
      const storedUser: IUser = JSON.parse(
        localStorage.getItem('auth-user') as string
      ) as IUser
      setUser(storedUser)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
