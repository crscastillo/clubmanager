export default function ClubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Public navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Fitness Club</h1>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#classes" className="text-gray-700 hover:text-gray-900">Classes</a>
              <a href="#membership" className="text-gray-700 hover:text-gray-900">Membership</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {children}
    </div>
  )
}