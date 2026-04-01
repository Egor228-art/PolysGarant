"use client";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const products = [
  {
    id: 'auto',
    icon: '🚗',
    title: 'Автострахование',
    description: 'ОСАГО и КАСКО с защитой от угона, ДТП и повреждений',
    features: ['Защита от угона', 'Ремонт на СТО', 'Эвакуация', 'Юридическая помощь'],
    price: 'от 5 000 ₽',
    popular: true
  },
  {
    id: 'property',
    icon: '🏠',
    title: 'Страхование недвижимости',
    description: 'Защита квартир и домов от пожара, затопления и других рисков',
    features: ['Пожар', 'Затопление', 'Стихийные бедствия', 'Незаконное проникновение'],
    price: 'от 3 000 ₽',
    popular: false
  },
  {
    id: 'health',
    icon: '❤️',
    title: 'ДМС',
    description: 'Добровольное медицинское страхование для всей семьи',
    features: ['Поликлиники по всей РФ', 'Стоматология', 'Скорая помощь', 'Стационар'],
    price: 'от 15 000 ₽',
    popular: true
  },
  {
    id: 'travel',
    icon: '✈️',
    title: 'Страхование путешествий',
    description: 'Медицинская помощь и защита за границей',
    features: ['Медицинская помощь', 'Страховка багажа', 'Отмена поездки', '24/7 поддержка'],
    price: 'от 1 500 ₽',
    popular: false
  },
  {
    id: 'life',
    icon: '👨‍👩‍👧',
    title: 'Страхование жизни',
    description: 'Финансовая защита для ваших близких',
    features: ['Страхование от несчастных случаев', 'Накопительные программы', 'Инвестиционное страхование'],
    price: 'от 10 000 ₽',
    popular: false
  },
  {
    id: 'business',
    icon: '💼',
    title: 'Страхование бизнеса',
    description: 'Защита вашего предприятия и сотрудников',
    features: ['Имущество юрлиц', 'Ответственность', 'Сотрудники', 'Перерывы в работе'],
    price: 'от 25 000 ₽',
    popular: false
  }
]

export default function ProductsPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleOrder = (productId) => {
    if (!session) {
      router.push('/?login=true')
    } else {
      router.push(`/policy/new?type=${productId}`)
    }
  }

  return (
    <div className="products-page">
      <div className="page-hero">
        <h1>Страховые продукты</h1>
        <p>Выберите защиту, которая подходит именно вам</p>
      </div>

      <div className="container">
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className={`product-card ${product.popular ? 'popular' : ''}`}>
              {product.popular && <div className="popular-badge">Популярный</div>}
              <div className="product-icon">{product.icon}</div>
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-features">
                {product.features.map((feature, i) => (
                  <span key={i} className="feature-tag">{feature}</span>
                ))}
              </div>
              <div className="product-price">{product.price}</div>
              <button className="btn" onClick={() => handleOrder(product.id)}>
                Оформить онлайн
              </button>
            </div>
          ))}
        </div>

        <div className="consultation-banner">
          <h3>Не знаете, какой продукт выбрать?</h3>
          <p>Наши эксперты помогут подобрать оптимальное решение</p>
          <button className="btn" onClick={() => router.push('/contacts')}>
            Получить консультацию
          </button>
        </div>
      </div>
    </div>
  )
}