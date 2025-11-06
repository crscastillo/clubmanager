'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/src/lib/supabase'

interface TenantSignupFormData {
  name: string
  subdomain: string
  ownerEmail: string
  ownerPassword: string
  description: string
}

export default function TenantSignup() {
  const [formData, setFormData] = useState<TenantSignupFormData>({
    name: '',
    subdomain: '',
    ownerEmail: '',
    ownerPassword: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const validateSubdomain = (subdomain: string) => {
    const regex = /^[a-z0-9]([a-z0-9\-]*[a-z0-9])?$/
    return regex.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 63
  }

  const checkSubdomainAvailability = async (subdomain: string) => {
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('id')
        .eq('subdomain', subdomain)
        .maybeSingle()
      
      // If table doesn't exist, return true (available)
      if (error && (error.code === 'PGRST205' || error.code === '42P01')) {
        console.warn('Tenants table not found, assuming subdomain is available')
        return true
      }
      
      // If there's another database error, return false (unavailable to be safe)
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking subdomain:', error)
        return false
      }
      
      // If data exists, subdomain is taken
      return !data
    } catch (err) {
      console.error('Unexpected error checking subdomain:', err)
      return true // Default to available on error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate subdomain format
      if (!validateSubdomain(formData.subdomain)) {
        throw new Error('Invalid subdomain format. Use only lowercase letters, numbers, and hyphens.')
      }

      // Check subdomain availability
      const isAvailable = await checkSubdomainAvailability(formData.subdomain)
      if (!isAvailable) {
        throw new Error('Subdomain is already taken. Please choose a different one.')
      }

      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.ownerEmail,
        password: formData.ownerPassword,
        options: {
          data: {
            tenant_signup: true,
            tenant_name: formData.name,
            tenant_subdomain: formData.subdomain,
            tenant_description: formData.description
          }
        }
      })

      if (authError) throw authError

      if (authData.user) {
        // Try to create tenant record
        const { error: tenantError } = await supabase
          .from('tenants')
          .insert({
            name: formData.name,
            subdomain: formData.subdomain,
            owner_email: formData.ownerEmail,
            owner_id: authData.user.id,
            settings: {
              description: formData.description
            }
          })

        // If table doesn't exist, still proceed with success (for demo purposes)
        if (tenantError && (tenantError.code === 'PGRST205' || tenantError.code === '42P01')) {
          console.warn('Tenants table not found, proceeding without database record')
        } else if (tenantError) {
          throw tenantError
        }

        // Try to create tenant admin record (optional)
        try {
          await supabase
            .from('tenant_admins')
            .insert({
              tenant_id: '', // Will be set by RLS/trigger
              user_id: authData.user.id,
              email: formData.ownerEmail,
              role: 'owner'
            })
        } catch (adminError) {
          console.warn('Admin record creation failed:', adminError)
        }

        setSuccess(true)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof TenantSignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Registration Successful!</h2>
        <p className="text-muted-foreground mb-4">
          Please check your email ({formData.ownerEmail}) to confirm your account.
        </p>
        <p className="text-sm text-muted-foreground">
          Once confirmed, you'll be able to access your admin dashboard at:{' '}
          <strong className="text-primary">https://{formData.subdomain}.{process.env.NEXT_PUBLIC_APP_DOMAIN}/admin</strong>
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card border border-border rounded-lg shadow-soft">
      <h1 className="text-2xl font-bold text-center mb-6 gradient-text">Create Your Fitness Club</h1>
      <p className="text-muted-foreground text-center mb-8">
        Start managing your gym, pool, or fitness club with our comprehensive platform.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Club/Business Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., FitLife Gym"
            required
          />
        </div>

        <div>
          <Label htmlFor="subdomain">Choose Your Subdomain</Label>
          <div className="flex">
            <Input
              id="subdomain"
              type="text"
              value={formData.subdomain}
              onChange={(e) => handleInputChange('subdomain', e.target.value.toLowerCase())}
              placeholder="fitlife"
              className="rounded-r-none"
              required
            />
            <span className="inline-flex items-center px-3 border border-l-0 border-border bg-muted text-muted-foreground rounded-r-md">
              .{process.env.NEXT_PUBLIC_APP_DOMAIN}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            3-63 characters, lowercase letters, numbers, and hyphens only
          </p>
        </div>

        <div>
          <Label htmlFor="ownerEmail">Owner Email</Label>
          <Input
            id="ownerEmail"
            type="email"
            value={formData.ownerEmail}
            onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
            placeholder="owner@fitlife.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="ownerPassword">Password</Label>
          <Input
            id="ownerPassword"
            type="password"
            value={formData.ownerPassword}
            onChange={(e) => handleInputChange('ownerPassword', e.target.value)}
            placeholder="Create a strong password"
            required
            minLength={8}
          />
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Tell us about your fitness club..."
            rows={3}
          />
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}