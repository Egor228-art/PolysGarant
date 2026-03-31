import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { SessionProvider, useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Страховой Полис | Защита вашего будущего',
  description: 'Надежная страховая компания. Оформите полис онлайн.',
}

function Header() {
  const { data: session } = useSession()

  return (
    <header className="main-header">
      <div className="header-content">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className="logo" style={{ cursor: 'pointer' }}>
            <h1>🏛️ ПолисГарант</h1>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {session?.user && (
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'}
              >
                <span>👤</span>
                <span style={{ fontWeight: '500', color: '#1f2937' }}>
                  {session.user.name || session.user.email.split('@')[0]}
                </span>
              </div>
            </Link>
          )}
          <div className="trust-badge">
            <span>⭐ 4.9 | 5000+ клиентов</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function RootLayoutContent({ children }) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <footer className="footer">
        <p>© 2026 ПолисГарант. Надежная защита для вас и вашего имущества</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
          Лицензия ЦБ РФ № 1234 | ОСАГО, КАСКО, ДМС, страхование недвижимости
        </p>
      </footer>
    </>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <SessionProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </SessionProvider>
      </body>
    </html>
  )
}