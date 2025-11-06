import { getTenantContext } from '@/src/lib/tenant'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function MemberPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tenant = getTenantContext()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Member Portal Navigation */}
      <nav className="bg-card/80 backdrop-blur-sm shadow-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold gradient-text">
                {tenant?.name || 'Fitness Club'}
              </Link>
              <span className="ml-3 text-sm text-muted-foreground">Member Portal</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/club" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/club/classes" className="text-muted-foreground hover:text-foreground transition-colors">
                Classes
              </Link>
              <Link href="/club/bookings" className="text-muted-foreground hover:text-foreground transition-colors">
                My Bookings
              </Link>
              <Link href="/club/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
              <Button size="sm" variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 {tenant?.name || 'Fitness Club'}. All rights reserved.</p>
            <p className="text-sm mt-2">
              Member Portal • <Link href="/" className="hover:text-foreground transition-colors">Return to {tenant?.name}</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}