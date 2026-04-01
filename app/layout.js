import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Providers } from './providers'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ПолисГарант | Надежная страховая компания',
  description: 'Страхование авто, недвижимости, здоровья и путешествий. Оформите полис онлайн за 5 минут.',
}

// Динамический импорт клиентских компонентов с отключенным SSR
const Navigation = dynamic(() => import('./components/Navigation'), { ssr: false })
const UserInfo = dynamic(() => import('./components/UserInfo'), { ssr: false })

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
        <Providers>
          <RootLayoutContent>{children}</RootLayoutContent>
        </Providers>
      </body>
    </html>
  )
}