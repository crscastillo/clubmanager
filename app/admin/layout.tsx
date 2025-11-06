import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - ClubManager',
  description: 'Manage your fitness club',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground gradient-text">
                ClubManager Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* User menu will be added here */}
              <span className="text-sm text-muted-foreground">Welcome, Admin</span>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}