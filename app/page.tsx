import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
          Club Manager
        </h1>
        <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 mb-8">
          Comprehensive club management system built with Next.js, Supabase, and shadcn/ui
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/dashboard">
              Get Started
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/login">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}