export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      class_bookings: {
        Row: {
          booked_at: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          checked_in_at: string | null
          class_id: string
          created_at: string | null
          id: string
          member_id: string
          no_show: boolean | null
          notes: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          booked_at?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          class_id: string
          created_at?: string | null
          id?: string
          member_id: string
          no_show?: boolean | null
          notes?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          booked_at?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          class_id?: string
          created_at?: string | null
          id?: string
          member_id?: string
          no_show?: boolean | null
          notes?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_bookings_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "club_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_bookings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      class_categories: {
        Row: {
          club_id: string
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          club_id: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_categories_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_categories_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          cancellation_reason: string | null
          category_id: string
          class_type: Database["public"]["Enums"]["class_type"] | null
          club_id: string
          created_at: string | null
          description: string | null
          duration_minutes: number
          ends_at: string
          equipment_needed: Json | null
          id: string
          instructor_id: string
          is_cancelled: boolean | null
          is_recurring: boolean | null
          location: string | null
          max_capacity: number | null
          name: string
          price_cents: number | null
          recurrence_pattern: Json | null
          skill_level: string | null
          starts_at: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          cancellation_reason?: string | null
          category_id: string
          class_type?: Database["public"]["Enums"]["class_type"] | null
          club_id: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          ends_at: string
          equipment_needed?: Json | null
          id?: string
          instructor_id: string
          is_cancelled?: boolean | null
          is_recurring?: boolean | null
          location?: string | null
          max_capacity?: number | null
          name: string
          price_cents?: number | null
          recurrence_pattern?: Json | null
          skill_level?: string | null
          starts_at: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          cancellation_reason?: string | null
          category_id?: string
          class_type?: Database["public"]["Enums"]["class_type"] | null
          club_id?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          ends_at?: string
          equipment_needed?: Json | null
          id?: string
          instructor_id?: string
          is_cancelled?: boolean | null
          is_recurring?: boolean | null
          location?: string | null
          max_capacity?: number | null
          name?: string
          price_cents?: number | null
          recurrence_pattern?: Json | null
          skill_level?: string | null
          starts_at?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "class_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      club_members: {
        Row: {
          club_id: string
          created_at: string | null
          date_of_birth: string | null
          email: string
          emergency_contact: Json | null
          first_name: string | null
          id: string
          is_active: boolean | null
          joined_at: string | null
          last_name: string | null
          membership_number: string | null
          notes: string | null
          phone: string | null
          profile_image_url: string | null
          tenant_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          club_id: string
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          emergency_contact?: Json | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          last_name?: string | null
          membership_number?: string | null
          notes?: string | null
          phone?: string | null
          profile_image_url?: string | null
          tenant_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          club_id?: string
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          emergency_contact?: Json | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          last_name?: string | null
          membership_number?: string | null
          notes?: string | null
          phone?: string | null
          profile_image_url?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          address: Json | null
          amenities: Json | null
          contact_info: Json | null
          created_at: string | null
          description: string | null
          id: string
          images: Json | null
          is_active: boolean | null
          name: string
          operating_hours: Json | null
          slug: string
          tenant_id: string
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          amenities?: Json | null
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          name: string
          operating_hours?: Json | null
          slug: string
          tenant_id: string
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          amenities?: Json | null
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          name?: string
          operating_hours?: Json | null
          slug?: string
          tenant_id?: string
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clubs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          bio: string | null
          certifications: Json | null
          club_id: string
          created_at: string | null
          email: string
          first_name: string
          hourly_rate_cents: number | null
          id: string
          is_active: boolean | null
          last_name: string
          phone: string | null
          profile_image_url: string | null
          specializations: Json | null
          tenant_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          certifications?: Json | null
          club_id: string
          created_at?: string | null
          email: string
          first_name: string
          hourly_rate_cents?: number | null
          id?: string
          is_active?: boolean | null
          last_name: string
          phone?: string | null
          profile_image_url?: string | null
          specializations?: Json | null
          tenant_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          certifications?: Json | null
          club_id?: string
          created_at?: string | null
          email?: string
          first_name?: string
          hourly_rate_cents?: number | null
          id?: string
          is_active?: boolean | null
          last_name?: string
          phone?: string | null
          profile_image_url?: string | null
          specializations?: Json | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instructors_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instructors_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      member_subscriptions: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          created_at: string | null
          ends_at: string | null
          id: string
          last_payment_at: string | null
          member_id: string
          next_payment_at: string | null
          payment_method_id: string | null
          plan_id: string
          starts_at: string
          status: Database["public"]["Enums"]["subscription_status"] | null
          tenant_id: string
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          ends_at?: string | null
          id?: string
          last_payment_at?: string | null
          member_id: string
          next_payment_at?: string | null
          payment_method_id?: string | null
          plan_id: string
          starts_at?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          tenant_id: string
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          ends_at?: string | null
          id?: string
          last_payment_at?: string | null
          member_id?: string
          next_payment_at?: string | null
          payment_method_id?: string | null
          plan_id?: string
          starts_at?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          tenant_id?: string
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_subscriptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "club_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_subscriptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          billing_interval: string
          club_id: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          features: Json | null
          id: string
          is_active: boolean | null
          limits: Json | null
          name: string
          price_cents: number
          tenant_id: string
          trial_days: number | null
          updated_at: string | null
        }
        Insert: {
          billing_interval?: string
          club_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          limits?: Json | null
          name: string
          price_cents?: number
          tenant_id: string
          trial_days?: number | null
          updated_at?: string | null
        }
        Update: {
          billing_interval?: string
          club_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          limits?: Json | null
          name?: string
          price_cents?: number
          tenant_id?: string
          trial_days?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_plans_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_plans_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_admins: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          email: string
          id: string
          invited_at: string | null
          invited_by: string | null
          is_active: boolean | null
          permissions: Json | null
          role: string | null
          tenant_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          email: string
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          permissions?: Json | null
          role?: string | null
          tenant_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          email?: string
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          permissions?: Json | null
          role?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_admins_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          confirmed_at: string | null
          created_at: string | null
          id: string
          name: string
          owner_email: string
          owner_id: string | null
          settings: Json | null
          status: Database["public"]["Enums"]["tenant_status"] | null
          subdomain: string
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          confirmed_at?: string | null
          created_at?: string | null
          id?: string
          name: string
          owner_email: string
          owner_id?: string | null
          settings?: Json | null
          status?: Database["public"]["Enums"]["tenant_status"] | null
          subdomain: string
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          confirmed_at?: string | null
          created_at?: string | null
          id?: string
          name?: string
          owner_email?: string
          owner_id?: string | null
          settings?: Json | null
          status?: Database["public"]["Enums"]["tenant_status"] | null
          subdomain?: string
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_tenant_id: { Args: never; Returns: string }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      booking_status: "confirmed" | "cancelled" | "waitlisted" | "completed"
      class_type:
        | "group_class"
        | "personal_training"
        | "open_gym"
        | "pool_session"
      subscription_status: "active" | "cancelled" | "expired" | "pending"
      tenant_status: "pending" | "active" | "suspended" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      booking_status: ["confirmed", "cancelled", "waitlisted", "completed"],
      class_type: [
        "group_class",
        "personal_training",
        "open_gym",
        "pool_session",
      ],
      subscription_status: ["active", "cancelled", "expired", "pending"],
      tenant_status: ["pending", "active", "suspended", "cancelled"],
    },
  },
} as const
