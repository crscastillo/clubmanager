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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation will be added here */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">ClubManager Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* User menu will be added here */}
              <span className="text-sm text-gray-700">Welcome, Admin</span>
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