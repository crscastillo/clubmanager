import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PlatformHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold gradient-text">ClubManager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Modern Club</span><br />
              <span className="text-foreground">Management</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              The complete multi-tenant platform for fitness clubs, gyms, pools, and recreational facilities. 
              Manage members, classes, subscriptions, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-4 h-auto">
                  Start Your Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Manage Your Club
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From member management to class scheduling, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-lg p-8 shadow-soft">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121L14.5 12l2.304-3.879A3 3 0 0021 6V4h-5m-6 16v-3.5a3.5 3.5 0 11-7 0V20M9 12.5v-7a3 3 0 016 0v7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Member Management</h3>
            <p className="text-muted-foreground">
              Complete member profiles, subscription tracking, and automated billing management.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-soft">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Class Scheduling</h3>
            <p className="text-muted-foreground">
              Easy class creation, booking management, and capacity tracking with waitlists.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-soft">
            <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Analytics & Reports</h3>
            <p className="text-muted-foreground">
              Detailed insights into member activity, revenue, and club performance metrics.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Club?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of clubs already using ClubManager to streamline their operations.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              Start Free Trial - No Credit Card Required
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold gradient-text mb-4">ClubManager</h3>
            <p className="text-muted-foreground">
              © 2025 ClubManager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}