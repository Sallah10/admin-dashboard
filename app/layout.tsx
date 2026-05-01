// app/layout.tsx
import Nav from '@/components/Nav';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard - User Management',
    template: '%s | Admin Dashboard'
  },
  description: 'Professional admin dashboard for managing users with search, filtering, and role-based access control. Built with Next.js and Prisma.',
  keywords: ['admin', 'dashboard', 'user management', 'admean'],
  authors: [{ name: 'Admin Dashboard Team' }],
  creator: 'Admin Dashboard Team',
  publisher: 'Admin Dashboard',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: 'Admin Dashboard - User Management',
    description: 'Professional admin dashboard for managing users with search, filtering, and role-based access control.',
    url: 'https://admin-dashboard-zeta-one-45.vercel.app',
    siteName: 'AdMean',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  //   maximumScale: 5,
  //   userScalable: true,
  // },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AdMean',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}