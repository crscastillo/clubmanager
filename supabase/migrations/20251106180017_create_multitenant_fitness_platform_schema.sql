-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'pending');
CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled', 'waitlisted', 'completed');
CREATE TYPE class_type AS ENUM ('group_class', 'personal_training', 'open_gym', 'pool_session');
CREATE TYPE tenant_status AS ENUM ('pending', 'active', 'suspended', 'cancelled');

-- =============================================
-- TENANTS TABLE (Core multi-tenancy)
-- =============================================
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(63) UNIQUE NOT NULL CHECK (subdomain ~ '^[a-z0-9]([a-z0-9\-]*[a-z0-9])?$'),
  status tenant_status DEFAULT 'pending',
  owner_email VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days')
);

-- =============================================
-- CLUBS TABLE (Each tenant can have multiple clubs/locations)
-- =============================================
CREATE TABLE clubs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  address JSONB, -- {street, city, state, zip, country}
  contact_info JSONB, -- {phone, email, website}
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  amenities JSONB DEFAULT '[]'::jsonb, -- Array of amenities
  operating_hours JSONB, -- {monday: {open: "06:00", close: "22:00"}, ...}
  timezone VARCHAR(50) DEFAULT 'UTC',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, slug)
);

-- =============================================
-- SUBSCRIPTION PLANS
-- =============================================
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  club_id UUID REFERENCES clubs(id) ON DELETE CASCADE, -- NULL means all clubs
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL DEFAULT 0,
  billing_interval VARCHAR(20) NOT NULL DEFAULT 'monthly', -- monthly, yearly, weekly, daily
  trial_days INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb, -- Array of feature descriptions
  limits JSONB DEFAULT '{}'::jsonb, -- {classes_per_month: 10, guest_passes: 2}
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CLUB MEMBERS (Users who join clubs)
-- =============================================
CREATE TABLE club_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  emergency_contact JSONB, -- {name, phone, relationship}
  profile_image_url TEXT,
  membership_number VARCHAR(50),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, user_id, club_id)
);

-- =============================================
-- MEMBER SUBSCRIPTIONS
-- =============================================
CREATE TABLE member_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES club_members(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  status subscription_status DEFAULT 'active',
  starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  payment_method_id VARCHAR(255), -- Stripe payment method ID
  last_payment_at TIMESTAMPTZ,
  next_payment_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CLASS CATEGORIES
-- =============================================
CREATE TABLE class_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7), -- Hex color code
  icon VARCHAR(50), -- Icon name/identifier
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, club_id, name)
);

-- =============================================
-- INSTRUCTORS/STAFF
-- =============================================
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  bio TEXT,
  specializations JSONB DEFAULT '[]'::jsonb, -- Array of specializations
  certifications JSONB DEFAULT '[]'::jsonb, -- Array of certifications
  profile_image_url TEXT,
  hourly_rate_cents INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, club_id, email)
);

-- =============================================
-- CLASSES/SESSIONS
-- =============================================
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES class_categories(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  class_type class_type DEFAULT 'group_class',
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  max_capacity INTEGER DEFAULT 20,
  price_cents INTEGER DEFAULT 0, -- 0 means included in membership
  location VARCHAR(255), -- Room name, pool area, etc.
  equipment_needed JSONB DEFAULT '[]'::jsonb,
  skill_level VARCHAR(50) DEFAULT 'beginner', -- beginner, intermediate, advanced, all_levels
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern JSONB, -- {frequency: 'weekly', days: ['monday', 'wednesday']}
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_cancelled BOOLEAN DEFAULT false,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CLASS BOOKINGS
-- =============================================
CREATE TABLE class_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES club_members(id) ON DELETE CASCADE,
  status booking_status DEFAULT 'confirmed',
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  checked_in_at TIMESTAMPTZ,
  no_show BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, member_id)
);

-- =============================================
-- TENANT ADMINS (Users who can manage tenant)
-- =============================================
CREATE TABLE tenant_admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin', -- owner, admin, manager, staff
  permissions JSONB DEFAULT '{}'::jsonb,
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

-- =============================================
-- INDEXES for performance
-- =============================================
CREATE INDEX idx_clubs_tenant_id ON clubs(tenant_id);
CREATE INDEX idx_clubs_slug ON clubs(slug);
CREATE INDEX idx_subscription_plans_tenant_id ON subscription_plans(tenant_id);
CREATE INDEX idx_club_members_tenant_id ON club_members(tenant_id);
CREATE INDEX idx_club_members_user_id ON club_members(user_id);
CREATE INDEX idx_member_subscriptions_tenant_id ON member_subscriptions(tenant_id);
CREATE INDEX idx_member_subscriptions_member_id ON member_subscriptions(member_id);
CREATE INDEX idx_classes_tenant_id ON classes(tenant_id);
CREATE INDEX idx_classes_club_id ON classes(club_id);
CREATE INDEX idx_classes_starts_at ON classes(starts_at);
CREATE INDEX idx_class_bookings_tenant_id ON class_bookings(tenant_id);
CREATE INDEX idx_class_bookings_class_id ON class_bookings(class_id);
CREATE INDEX idx_class_bookings_member_id ON class_bookings(member_id);
CREATE INDEX idx_tenant_admins_tenant_id ON tenant_admins(tenant_id);
CREATE INDEX idx_tenant_admins_user_id ON tenant_admins(user_id);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_admins ENABLE ROW LEVEL SECURITY;

-- Helper function to get current tenant_id from JWT or app setting
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
BEGIN
  -- Try to get from JWT claim first
  IF current_setting('request.jwt.claims', true)::jsonb ? 'tenant_id' THEN
    RETURN (current_setting('request.jwt.claims', true)::jsonb->>'tenant_id')::uuid;
  END IF;
  
  -- Fallback to app setting
  RETURN nullif(current_setting('app.current_tenant_id', true), '')::uuid;
EXCEPTION
  WHEN others THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tenants: Users can only see tenants they own or are admins of
CREATE POLICY tenant_access_policy ON tenants
  FOR ALL
  USING (
    owner_id = auth.uid() 
    OR id IN (
      SELECT tenant_id FROM tenant_admins 
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Clubs: Tenant isolation
CREATE POLICY club_tenant_isolation ON clubs
  FOR ALL
  USING (tenant_id = get_current_tenant_id());

-- Subscription Plans: Tenant isolation
CREATE POLICY subscription_plans_tenant_isolation ON subscription_plans
  FOR ALL
  USING (tenant_id = get_current_tenant_id());

-- Club Members: Tenant isolation + member can see own data
CREATE POLICY club_members_policy ON club_members
  FOR ALL
  USING (
    tenant_id = get_current_tenant_id()
    OR user_id = auth.uid()
  );

-- Member Subscriptions: Tenant isolation + member can see own subscriptions
CREATE POLICY member_subscriptions_policy ON member_subscriptions
  FOR ALL
  USING (
    tenant_id = get_current_tenant_id()
    OR member_id IN (
      SELECT id FROM club_members WHERE user_id = auth.uid()
    )
  );

-- Class Categories: Tenant isolation
CREATE POLICY class_categories_tenant_isolation ON class_categories
  FOR ALL
  USING (tenant_id = get_current_tenant_id());

-- Instructors: Tenant isolation
CREATE POLICY instructors_tenant_isolation ON instructors
  FOR ALL
  USING (tenant_id = get_current_tenant_id());

-- Classes: Tenant isolation
CREATE POLICY classes_tenant_isolation ON classes
  FOR ALL
  USING (tenant_id = get_current_tenant_id());

-- Class Bookings: Tenant isolation + member can see own bookings
CREATE POLICY class_bookings_policy ON class_bookings
  FOR ALL
  USING (
    tenant_id = get_current_tenant_id()
    OR member_id IN (
      SELECT id FROM club_members WHERE user_id = auth.uid()
    )
  );

-- Tenant Admins: Users can see admin records for tenants they belong to
CREATE POLICY tenant_admins_policy ON tenant_admins
  FOR ALL
  USING (
    tenant_id = get_current_tenant_id()
    OR user_id = auth.uid()
  );

-- =============================================
-- TRIGGERS for updated_at timestamps
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON clubs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_club_members_updated_at BEFORE UPDATE ON club_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_member_subscriptions_updated_at BEFORE UPDATE ON member_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_class_categories_updated_at BEFORE UPDATE ON class_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_class_bookings_updated_at BEFORE UPDATE ON class_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tenant_admins_updated_at BEFORE UPDATE ON tenant_admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
