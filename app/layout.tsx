import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserAuthContextProvider } from "../src/context/UserAuthContext";
import ToasterContext from '@/src/context/ToasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leet Code',
  description: 'Leet code clone app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserAuthContextProvider>
        <body className={inter.className}>
          <ToasterContext />
          {children}
        </body>
      </UserAuthContextProvider>    
    </html>
  )
}
