# Club Manager

A comprehensive club management system built with Next.js, Supabase, and shadcn/ui.

## Features

- 🔐 Authentication with Supabase Auth
- 👥 Member Management
- 📅 Event Management
- 💳 Membership & Payment Tracking
- 📊 Analytics Dashboard
- 🎨 Modern UI with shadcn/ui components
- 🌙 Dark/Light mode support
- 📱 Fully responsive design

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **UI Components:** shadcn/ui (Radix UI + Tailwind CSS)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
clubmanager/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
│   ├── supabase.ts        # Supabase client
│   ├── supabase-server.ts # Server-side Supabase client
│   └── utils.ts           # General utilities
└── ...config files
```

## Database Schema

The application uses Supabase with the following main tables:
- `profiles` - User profiles
- `members` - Club members
- `events` - Club events
- `memberships` - Membership records
- `payments` - Payment tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
