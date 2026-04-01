"use client";
import { useState } from 'react'
import Link from 'next/link'

const articles = [
  {
    id: 1,
    title: 'Как оформить полис ОСАГО в 2024 году?',
    excerpt: 'Пошаговая инструкция по оформлению обязательного автострахования',
    date: '15 марта 2024',
    category: 'Советы',
    image: '🚗'
  },
  {
    id: 2,
    title: 'Новые правила выплат по КАСКО',
    excerpt: 'Что изменилось для автовладельцев с 1 января 2024 года',
    date: '10 марта 2024',
    category: 'Новости',
    image: '📋'
  },
  {
    id: 3,
    title: 'Как выбрать ДМС для семьи',
    excerpt: 'Сравнение программ и советы по выбору оптимального полиса',
    date: '5 марта 2024',
    category: 'Советы',
    image: '👨‍👩‍👧'
  },
  {
    id: 4,
    title: 'Страхование недвижимости: что нужно знать',
    excerpt: 'Основные риски и как от них защититься',
    date: '28 февраля 2024',
    category: 'Обзоры',
    image: '🏠'
  },
  {
    id: 5,
    title: 'Способы оплаты страховых взносов',
    excerpt: 'Все доступные способы оплаты полисов',
    date: '20 февраля 2024',
    category: 'Информация',
    image: '💳'
  },
  {
    id: 6,
    title: 'Как получить выплату по страховому случаю',
    excerpt: 'Пошаговый алгоритм действий при наступлении страхового события',
    date: '15 февраля 2024',
    category: 'Инструкции',
    image: '📝'
  }
]

export default function BlogPage() {
  const [filter, setFilter] = useState('all')
  const categories = ['all', ...new Set(articles.map(a => a.category))]

  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(a => a.category === filter)

  return (
    <div className="blog-page">
      <div className="page-hero">
        <h1>Новости и статьи</h1>
        <p>Будьте в курсе последних новостей страхования</p>
      </div>

      <div className="container">
        <div className="blog-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'Все' : cat}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filteredArticles.map(article => (
            <Link href={`/blog/${article.id}`} key={article.id} className="blog-card">
              <div className="blog-image">{article.image}</div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">{article.category}</span>
                  <span className="blog-date">{article.date}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="read-more">Читать далее →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}