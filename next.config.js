/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Отключаем статический рендеринг для всех страниц
  // Это заставит Next.js рендерить страницы на сервере при запросе,
  // а не во время сборки, что решит проблему с хуками
  staticPageGenerationTimeout: 120,
  experimental: {
    // Отключаем статическую генерацию для страниц с 'use client'
    clientRouterFilter: true,
  },
}

module.exports = nextConfig