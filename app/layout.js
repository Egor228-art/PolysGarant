import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Страховой Полис | Защита вашего будущего',
  description: 'Надежная страховая компания. Оформите полис онлайн.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header className="main-header">
          <div className="header-content">
            <div className="logo">
              <Link href="/" style={{ textDecoration: 'none' }}>
                <h1 style={{ cursor: 'pointer' }}>🏛️ ПолисГарант</h1>
              </Link>
            </div>
            <div className="trust-badge">
              <span>⭐ 4.9 | 5000+ клиентов</span>
            </div>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <p>© 2024 ПолисГарант. Надежная защита для вас и вашего имущества</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
            Лицензия ЦБ РФ № 1234 | ОСАГО, КАСКО, ДМС, страхование недвижимости
          </p>
        </footer>
      </body>
    </html>
  )
}