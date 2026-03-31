import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Страховой Полис | Защита вашего будущего',
  description: 'Надежная страховая компания. Оформите полис онлайн.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header style={{ padding: '1rem', background: '#0a2540', color: 'white', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>Страховая компания "ПолисГарант"</h1>
        </header>
        <main>{children}</main>
        <footer style={{ textAlign: 'center', padding: '1rem', background: '#f5f7fa', marginTop: '2rem' }}>
          <p>© 2024 ПолисГарант. Все права защищены.</p>
        </footer>
      </body>
    </html>
  )
}