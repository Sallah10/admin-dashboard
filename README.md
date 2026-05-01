# AdMean - Admin Dashboard

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready admin dashboard for managing users with advanced search, real-time filtering, role-based access control, and beautiful data visualization.

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Setup](#-setup) • [Contributing](#-contributing)

</div>

![admin-dashboard](https://github.com/user-attachments/assets/32071316-8c81-4281-bcc1-651099d42e9b)

## ✨ Features

- **🔐 Secure Authentication** - GitHub OAuth integration with NextAuth for seamless login
- **👥 User Management** - Full CRUD operations with intuitive user interface
- **🔍 Advanced Search** - Real-time search with debouncing across name and email fields
- **📊 Analytics Dashboard** - Interactive charts and data visualization with Tremor
- **🎯 Role-Based Access Control** - Admin and User roles with permission management
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **⚡ High Performance** - Server-side rendering with Next.js 14 and optimized queries
- **🎨 Modern UI** - Tailwind CSS with Tremor components for beautiful interfaces
- **🧩 Modular Architecture** - Reusable, well-organized components
- **📈 SEO Optimized** - Full metadata, sitemap, and robots.txt configuration

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Sallah10/admin-dashboard.git
cd admin-dashboard

# Install dependencies
npm install

# Set up environment variables (see Setup section)
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Tech Stack

| Layer                  | Technology                                              |
| ---------------------- | ------------------------------------------------------- |
| **Frontend Framework** | [Next.js 14](https://nextjs.org) with App Router        |
| **Language**           | [TypeScript 5+](https://www.typescriptlang.org)         |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com)                 |
| **UI Components**      | [Tremor](https://www.tremor.so) (Charts & Tables)       |
| **Database**           | [PostgreSQL](https://www.postgresql.org) (via Railway)  |
| **ORM**                | [Prisma](https://www.prisma.io)                         |
| **Authentication**     | [NextAuth.js](https://authjs.dev) with GitHub OAuth     |
| **Debouncing**         | [use-debounce](https://github.com/xnimorz/use-debounce) |
| **Icons**              | [Lucide React](https://lucide.dev)                      |
| **Avatar Fallbacks**   | [Avvvatars](https://avvvatars.com)                      |

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** 18.17 or later ([Download](https://nodejs.org))
- **npm** or **yarn** package manager
- **GitHub Account** ([github.com](https://github.com))
- **PostgreSQL Database** (We recommend [Railway.app](https://railway.app))
- **Code Editor** - [VSCode](https://code.visualstudio.com) recommended

### 1. Clone and Install

```bash
git clone https://github.com/Sallah10/admin-dashboard.git
cd admin-dashboard
npm install
```

### 2. Database Setup

1. Create a PostgreSQL database on [neon.com/](https://neon.com/)
2. Copy the database connection URL

### 3. GitHub OAuth Configuration

1. Go to [GitHub Settings → Developer applications](https://github.com/settings/applications/new)
2. Create a new OAuth App:
   - **Application name**: Admin Dashboard
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Copy your `Client ID` and `Client Secret`

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 5. Database Migration

```bash
npx prisma migrate dev
# This will create all tables based on your schema
```

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
admin-dashboard/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page with user table
│   ├── not-found.tsx             # 404 page
│   ├── actions/                  # Server actions
│   ├── analytics/                # Analytics page
│   └── api/
│       └── auth/[...nextauth]/   # NextAuth configuration
├── components/                   # Reusable React components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Nav.tsx                  # Side navigation
│   ├── UsersTable.tsx           # User table with filtering
│   ├── Search.tsx               # Search component with debouncing
│   ├── Analytics.tsx            # Analytics dashboard
│   ├── Chart.tsx                # Chart component
│   └── DeleteUserButton.tsx      # Delete user action
├── lib/                          # Utility functions
│   └── prisma.ts               # Prisma client instance
├── prisma/                       # Prisma ORM
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Database seeding
│   └── migrations/             # Database migrations
├── public/                       # Static assets
│   └── robots.txt              # SEO robots configuration
└── package.json                 # Dependencies and scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm start               # Start production server

# Database
npx prisma studio      # Open Prisma Studio (visual DB browser)
npx prisma migrate dev # Create and apply migrations

# Linting
npm run lint            # Run ESLint
```

## 🎯 Usage

### Search Users

1. Start typing in the search box on the home page
2. Results filter in real-time with debouncing (300ms delay)
3. Click the ✕ icon to clear the search filter
4. Results show "No users found" when filter returns empty

### User Management

- **View Users**: All users display in the table with details
- **Delete Users**: Admin users can delete users via the Actions column
- **Filter by Role**: Users display their role badge (Admin/User)

### Analytics

Navigate to `/analytics` to view dashboard statistics and charts.

## 🔐 Security Features

- ✅ GitHub OAuth - Secure authentication
- ✅ Protected routes - Server-side session verification
- ✅ Role-based access control - Admin-only operations
- ✅ CSRF protection - Built-in NextAuth security
- ✅ SQL injection prevention - Prisma parameterized queries
- ✅ Environment variable protection - Secrets in .env.local

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

If you have any questions or issues, please:

- Open an [Issue](https://github.com/Sallah10/admin-dashboard/issues)
- Start a [Discussion](https://github.com/Sallah10/admin-dashboard/discussions)
- Check existing documentation

## 🎉 Acknowledgments

Special thanks to all the amazing libraries and services that make this project possible!
