import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth'
import { User } from '../types/user.type'
import { ExtendedPurchase } from '../types/purchase.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}

const initialContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  setProfile: () => null,
  profile: getProfileFromLS(),
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setExtendedPurchases([])
  }
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, extendedPurchases, setExtendedPurchases, reset }}>
      {children}
    </AppContext.Provider>
  )
}
