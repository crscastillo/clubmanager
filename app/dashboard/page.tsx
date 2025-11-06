export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Dashboard
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Members</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Events</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-primary">$0</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Active Memberships</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}