import { getTenantContext } from '@/src/lib/tenant'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MemberDashboard() {
  const tenant = getTenantContext()
  
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="bg-card rounded-lg shadow-soft border border-border p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome Back!
        </h1>
        <p className="text-muted-foreground">
          Ready for your workout at {tenant?.name || 'your fitness club'}? Here's what's happening today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg shadow-soft border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Book a Class</h3>
            <div className="p-2 bg-primary/10 rounded-lg">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Find and book your next workout session from our available classes.
          </p>
          <Link href="/club/classes">
            <Button className="w-full">Browse Classes</Button>
          </Link>
        </div>

        <div className="bg-card rounded-lg shadow-soft border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">My Bookings</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            View and manage your upcoming class bookings and workout history.
          </p>
          <Link href="/club/bookings">
            <Button variant="outline" className="w-full">View Bookings</Button>
          </Link>
        </div>

        <div className="bg-card rounded-lg shadow-soft border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">My Profile</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg">
              <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Update your profile information, preferences, and membership details.
          </p>
          <Link href="/club/profile">
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </Link>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-card rounded-lg shadow-soft border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div>
              <h4 className="font-medium text-foreground">Morning Yoga</h4>
              <p className="text-sm text-muted-foreground">9:00 AM - 10:00 AM • Studio A</p>
            </div>
            <div className="text-sm text-primary font-medium">Booked</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-muted-foreground">HIIT Training</h4>
              <p className="text-sm text-muted-foreground">6:00 PM - 7:00 PM • Main Gym</p>
            </div>
            <Button size="sm" variant="outline">Book Now</Button>
          </div>
        </div>
      </div>

      {/* Membership Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Membership Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium text-foreground">Premium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Billing</span>
              <span className="font-medium text-foreground">Dec 6, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Classes This Month</span>
              <span className="font-medium text-foreground">12/Unlimited</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Classes Attended</span>
              <span className="font-medium text-foreground">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Favorite Class</span>
              <span className="font-medium text-foreground">Yoga Flow</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium text-foreground">Jan 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Club?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide everything you need to reach your fitness goals in a welcoming environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1.343-4 4-4 5.907 0 7.975 4.343 5.657 6.657z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
            <p className="text-gray-600">
              Work with certified professionals who will guide you every step of the way.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Modern Equipment</h3>
            <p className="text-gray-600">
              Train with the latest fitness equipment and technology for optimal results.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              Join a supportive community of like-minded individuals on their fitness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Classes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From high-intensity workouts to relaxing yoga sessions, we have something for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample class cards */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-red-400 to-red-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">HIIT Training</h3>
                <p className="text-gray-600 mb-4">
                  High-intensity interval training for maximum calorie burn and fitness improvement.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">45 minutes</span>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Yoga Flow</h3>
                <p className="text-gray-600 mb-4">
                  Mindful movement and breathing exercises to improve flexibility and reduce stress.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">60 minutes</span>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Strength Training</h3>
                <p className="text-gray-600 mb-4">
                  Build muscle and increase strength with guided weightlifting sessions.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">50 minutes</span>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Membership Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your lifestyle and fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Basic</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">$29</div>
            <div className="text-gray-600 mb-6">/month</div>
            <ul className="space-y-3 mb-6 text-left">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access to gym equipment
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Locker room access
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                2 guest passes/month
              </li>
            </ul>
            <Button className="w-full">Choose Basic</Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Premium</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">$59</div>
            <div className="text-gray-600 mb-6">/month</div>
            <ul className="space-y-3 mb-6 text-left">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Everything in Basic
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited group classes
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                5 guest passes/month
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Pool access
              </li>
            </ul>
            <Button className="w-full">Choose Premium</Button>
          </div>

          {/* Elite Plan */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Elite</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">$99</div>
            <div className="text-gray-600 mb-6">/month</div>
            <ul className="space-y-3 mb-6 text-left">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Everything in Premium
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Personal training sessions
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited guest passes
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Nutrition counseling
              </li>
            </ul>
            <Button className="w-full">Choose Elite</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied members who have transformed their lives with us.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}