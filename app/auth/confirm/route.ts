import { createSupabaseServerClient } from '@/src/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    })

    if (!error && data.user) {
      // Check if this is a tenant signup confirmation
      const userMetadata = data.user.user_metadata
      if (userMetadata.tenant_signup) {
        try {
          // Update tenant status to active
          const { error: tenantError } = await supabase
            .from('tenants')
            .update({ 
              status: 'active',
              confirmed_at: new Date().toISOString()
            })
            .eq('owner_id', data.user.id)

          if (tenantError) {
            console.error('Error updating tenant status:', tenantError)
          }

          // Create initial club for the tenant
          const { data: tenant } = await supabase
            .from('tenants')
            .select('id, name, subdomain')
            .eq('owner_id', data.user.id)
            .single()

          if (tenant) {
            const { error: clubError } = await supabase
              .from('clubs')
              .insert({
                tenant_id: tenant.id,
                name: tenant.name,
                slug: 'main',
                description: `Main location for ${tenant.name}`,
                is_active: true
              })

            if (clubError) {
              console.error('Error creating initial club:', clubError)
            }

            // Redirect to their subdomain admin panel
            return redirect(`${origin.includes('localhost') ? 'http' : 'https'}://${tenant.subdomain}.${origin.split('//')[1]}/admin`)
          }
        } catch (err) {
          console.error('Error in tenant confirmation:', err)
        }
      }

      // Regular user confirmation - redirect to dashboard
      return redirect(`${origin}/dashboard`)
    }
  }

  // Return the user to an error page with instructions
  return redirect('/auth/auth-code-error')
}