'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path) => pathname === path ? 'active' : ''

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