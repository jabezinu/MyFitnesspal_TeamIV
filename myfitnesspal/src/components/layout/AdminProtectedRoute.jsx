

import { useAuth } from "../../contexts/AuthContext" 
import { AuthPage } from "../auth/AuthPage" 

export const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Check if user is admin (you can modify this logic based on your user model)
  const isAdmin = user?.labels?.includes("admin") || user?.email === "admin@fittracker.com"

  if (!user) {
    return <AuthPage />
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have permission to access the admin dashboard.</p>
          <a href="/" className="text-primary hover:underline">
            Return to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return children
}