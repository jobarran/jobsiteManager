import './globals.css'
import { inter } from '@/config/fonts'
import type { Metadata } from 'next'
import { Provider } from '@/components'

export const metadata: Metadata = {
  title: 'Jobsite Management',
  description: 'The construction tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Provider>{children}</Provider>
        </body>
    </html>
  )
}
