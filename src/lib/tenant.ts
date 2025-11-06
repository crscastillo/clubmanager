import { headers } from 'next/headers'

export interface TenantContext {
  id: string
  name: string
  subdomain: string
}

export function getTenantContext(): TenantContext | null {
  try {
    const headersList = headers()
    const tenantId = headersList.get('x-tenant-id')
    const tenantName = headersList.get('x-tenant-name')
    const tenantSubdomain = headersList.get('x-tenant-subdomain')

    if (!tenantId || !tenantName || !tenantSubdomain) {
      return null
    }

    return {
      id: tenantId,
      name: tenantName,
      subdomain: tenantSubdomain,
    }
  } catch (error) {
    console.error('Error getting tenant context:', error)
    return null
  }
}

export function createTenantSupabaseClient() {
  // This will be used to set the tenant context for RLS
  const tenant = getTenantContext()
  
  if (tenant) {
    // Set the current tenant ID for RLS
    // This would be implemented with a custom hook or context provider
    return {
      tenantId: tenant.id,
      // ... other tenant-specific configuration
    }
  }
  
  return null
}