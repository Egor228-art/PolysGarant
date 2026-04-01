import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ПолисГарант | Надежная страховая компания',
  description: 'Страхование авто, недвижимости, здоровья и путешествий. Оформите полис онлайн за 5 минут.',
}

// Клиентский компонент для навигации
function Navigation() {
  'use client'
  const { usePathname } = require('next/navigation')
  const { useSession } = require('next-auth/react')
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path) => {
    return pathname === path ? 'active' : ''
  }

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-links">
          <Link href="/" className={isActive('/')}>Главная</Link>
          <Link href="/products" className={isActive('/products')}>Страховые продукты</Link>
          <Link href="/about" className={isActive('/about')}>О компании</Link>
          <Link href="/contacts" className={isActive('/contacts')}>Контакты</Link>
          <Link href="/blog" className={isActive('/blog')}>Новости</Link>
          <Link href="/faq" className={isActive('/faq')}>FAQ</Link>
        </div>
        {session?.user ? (
          <Link href="/dashboard" className="nav-user">
            👤 {session.user.name || session.user.email.split('@')[0]}
          </Link>
        ) : (
          <Link href="/?login=true" className="nav-login">Войти</Link>
        )}
      </div>
    </nav>
  )
}

// Клиентский компонент для отображения имени пользователя в шапке
function UserInfo() {
  'use client'
  const { useSession } = require('next-auth/react')
  const { data: session } = useSession()

  return (
    <div className="header-contacts">
      <div className="phone">8-800-555-35-35</div>
      <div className="work-time">Ежедневно 9:00-21:00</div>
      {session?.user && (
        <div className="user-badge">
          👤 {session.user.name || session.user.email.split('@')[0]}
        </div>
      )}
    </div>
  )
}

function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <Link href="/" className="logo-link">
          <div className="logo">
            <h1>🏛️ ПолисГарант</h1>
            <p className="logo-subtitle">Страхование с заботой о вас</p>
          </div>
        </Link>
        <UserInfo />
      </div>
      <Navigation />
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ПолисГарант</h3>
          <p>Надежная защита с 2010 года</p>
          <p>Лицензия ЦБ РФ № 1234</p>
        </div>
        <div className="footer-section">
          <h3>Страхование</h3>
          <Link href="/products#auto">Автострахование</Link>
          <Link href="/products#property">Недвижимость</Link>
          <Link href="/products#health">Здоровье</Link>
          <Link href="/products#travel">Путешествия</Link>
        </div>
        <div className="footer-section">
          <h3>О компании</h3>
          <Link href="/about">О нас</Link>
          <Link href="/contacts">Контакты</Link>
          <Link href="/blog">Новости</Link>
          <Link href="/faq">Вопросы-ответы</Link>
        </div>
        <div className="footer-section">
          <h3>Контакты</h3>
          <p>📞 8-800-555-35-35</p>
          <p>📧 info@polisgarant.ru</p>
          <p>📍 Москва, ул. Страховая, 15</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ПолисГарант. Все права защищены</p>
      </div>
    </footer>
  )
}

function RootLayoutContent({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
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