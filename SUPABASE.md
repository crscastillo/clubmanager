# Supabase Development Commands (Linked Database)

This project is configured to work with a linked remote Supabase database instead of running a local instance.

## Database Management Commands

### Project Setup
- `npm run db:link` - Link your local project to a remote Supabase project
- `npm run db:status` - Check the status of your linked Supabase project

### Schema Management
- `npm run db:pull` - Pull schema changes from your linked remote database
- `npm run db:push` - Push local migrations to your linked remote database
- `npm run db:new-migration <name>` - Create a new migration file
- `npm run db:reset` - Reset your linked database (⚠️ Use with caution!)

### Type Generation
- `npm run db:types` - Generate TypeScript types from your linked database schema

## Getting Started

1. **First, link your project to a remote Supabase database:**
   ```bash
   npm run db:link
   ```
   You'll need your Supabase project reference ID and database password.

2. **Pull existing schema (if any):**
   ```bash
   npm run db:pull
   ```

3. **Create your first migration:**
   ```bash
   npm run db:new-migration create_initial_tables
   ```

4. **Edit the migration file** in `supabase/migrations/` to define your schema

5. **Push the migration to your database:**
   ```bash
   npm run db:push
   ```

6. **Generate TypeScript types:**
   ```bash
   npm run db:types
   ```

Your database types will be generated in `src/lib/types/database-generated.ts`

## Environment Variables

Make sure to set up your environment variables in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

You can get these values from your Supabase project dashboard at https://supabase.com/dashboard

## Workflow

1. **Development:** Make schema changes by creating migrations
2. **Testing:** Use `npm run db:push` to apply changes to your linked database
3. **Type Safety:** Run `npm run db:types` after schema changes to update TypeScript types
4. **Collaboration:** Other developers can use `npm run db:pull` to get the latest schema