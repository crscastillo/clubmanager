import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Create Supabase client for session management
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()
  
  // Handle subdomain routing
  const subdomain = getSubdomain(hostname)
  
  if (subdomain && subdomain !== 'www') {
    // This is a tenant subdomain request
    try {
      // Get tenant by subdomain
      const { data: tenant, error } = await supabase
        .from('tenants')
        .select('id, name, status, subdomain')
        .eq('subdomain', subdomain)
        .eq('status', 'active')
        .single()

      if (error || !tenant) {
        // Tenant not found or inactive, redirect to main app
        url.hostname = getMainDomain(hostname)
        url.pathname = '/tenant-not-found'
        return NextResponse.redirect(url)
      }

      // Set tenant context in headers for the app to use
      supabaseResponse.headers.set('x-tenant-id', tenant.id)
      supabaseResponse.headers.set('x-tenant-subdomain', tenant.subdomain)
      supabaseResponse.headers.set('x-tenant-name', tenant.name)

      // Rewrite to appropriate route based on path
      if (url.pathname.startsWith('/admin')) {
        // Admin routes - keep as is but add tenant context
        return supabaseResponse
      } else {
        // Public club routes - rewrite to club pages
        if (url.pathname === '/') {
          url.pathname = '/club'
        } else if (!url.pathname.startsWith('/club')) {
          url.pathname = `/club${url.pathname}`
        }
        
        const rewriteResponse = NextResponse.rewrite(url)
        
        // Copy tenant headers to rewrite response
        rewriteResponse.headers.set('x-tenant-id', tenant.id)
        rewriteResponse.headers.set('x-tenant-subdomain', tenant.subdomain)
        rewriteResponse.headers.set('x-tenant-name', tenant.name)
        
        // Copy Supabase cookies
        supabaseResponse.cookies.getAll().forEach(cookie => {
          rewriteResponse.cookies.set(cookie.name, cookie.value)
        })
        
        return rewriteResponse
      }
    } catch (error) {
      console.error('Middleware error:', error)
      // Fallback to main domain on error
      url.hostname = getMainDomain(hostname)
      url.pathname = '/error'
      return NextResponse.redirect(url)
    }
  }

  // Main domain requests - handle normally with Supabase session
  return supabaseResponse
}

function getSubdomain(hostname: string): string | null {
  if (hostname.includes('localhost')) {
    // For local development, extract subdomain from format: subdomain.localhost:3002
    const parts = hostname.split('.')
    if (parts.length >= 2 && parts[0] !== 'localhost') {
      return parts[0]
    }
    return null
  }

  // For production, extract from format: subdomain.clubmanager.com
  const parts = hostname.split('.')
  if (parts.length >= 3) {
    return parts[0]
  }
  return null
}

function getMainDomain(hostname: string): string {
  if (hostname.includes('localhost')) {
    return 'localhost:3002'
  }
  return 'clubmanager.com'
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files) 
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth routes should work on main domain)
     * - signup (signup should work on main domain)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}