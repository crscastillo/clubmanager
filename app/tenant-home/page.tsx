import { getTenantContext } from '@/src/lib/tenant'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TenantHomepage() {
  const tenant = getTenantContext()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-sm shadow-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold gradient-text">
                {tenant?.name || 'Fitness Club'}
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/club" className="text-muted-foreground hover:text-foreground transition-colors">
                Member Portal
              </Link>
              <Link href="/club#classes" className="text-muted-foreground hover:text-foreground transition-colors">
                Classes
              </Link>
              <Link href="/club#membership" className="text-muted-foreground hover:text-foreground transition-colors">
                Membership
              </Link>
              <Link href="/admin">
                <Button variant="outline" size="sm">Admin</Button>
              </Link>
              <Link href="/club/join">
                <Button size="sm">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-blue-600/90 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to {tenant?.name || 'Our Fitness Club'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Transform your fitness journey with us. State-of-the-art facilities, expert trainers, 
              and a supportive community to help you reach your goals.
            </p>
            <div className="space-x-4">
              <Link href="/club/join">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 h-auto">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/club#classes">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto border-white text-white hover:bg-white hover:text-primary">
                  View Classes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Happy Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Weekly Classes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Expert Trainers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Access Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to achieve your fitness goals in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Equipment</h3>
              <p className="text-muted-foreground">
                State-of-the-art fitness equipment and facilities for all your workout needs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1.343-4 4-4 5.907 0 7.975 4.343 5.657 6.657z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
              <p className="text-muted-foreground">
                Certified professionals to guide and motivate you on your fitness journey.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-violet-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Join a supportive community of fitness enthusiasts working towards their goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-y border-border py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community today and take the first step towards a healthier you.
          </p>
          <div className="space-x-4">
            <Link href="/club/join">
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
                Become a Member
              </Button>
            </Link>
            <Link href="/club">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto">
                Member Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">{tenant?.name || 'Fitness Club'}</h3>
              <p className="text-muted-foreground text-sm">
                Your premier fitness destination for achieving your health and wellness goals.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/club#classes" className="hover:text-foreground">Classes</Link></li>
                <li><Link href="/club#membership" className="hover:text-foreground">Membership</Link></li>
                <li><Link href="/club/trainers" className="hover:text-foreground">Trainers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/club/contact" className="hover:text-foreground">Contact Us</Link></li>
                <li><Link href="/club/faq" className="hover:text-foreground">FAQ</Link></li>
                <li><Link href="/club/policies" className="hover:text-foreground">Policies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Connect</h4>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs">FB</span>
                </div>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs">IG</span>
                </div>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs">TW</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 {tenant?.name || 'Fitness Club'}. All rights reserved. Powered by ClubManager.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}