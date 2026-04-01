export const dynamic = 'force-dynamic'

"use client";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="page-hero">
        <h1>О компании ПолисГарант</h1>
        <p>Надежная защита для вас и вашего имущества с 2010 года</p>
      </div>

      <div className="container">
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🏆</div>
            <h3>14 лет на рынке</h3>
            <p>Более 500 000 довольных клиентов по всей России</p>
          </div>
          <div className="about-card">
            <div className="about-icon">⭐</div>
            <h3>4.9 из 5</h3>
            <p>Средняя оценка наших услуг по отзывам клиентов</p>
          </div>
          <div className="about-card">
            <div className="about-icon">⚡</div>
            <h3>3 дня</h3>
            <p>Средний срок выплаты страхового возмещения</p>
          </div>
          <div className="about-card">
            <div className="about-icon">🌍</div>
            <h3>80+ филиалов</h3>
            <p>Представительства во всех регионах России</p>
          </div>
        </div>

        <div className="about-text">
          <h2>Наша миссия</h2>
          <p>Сделать страхование доступным, понятным и надежным для каждого клиента. Мы стремимся предоставить максимальную защиту по оптимальной цене.</p>
          
          <h2>Наши ценности</h2>
          <ul>
            <li><strong>Честность</strong> - прозрачные условия без скрытых комиссий</li>
            <li><strong>Скорость</strong> - оформление полиса за 5 минут, выплаты за 3 дня</li>
            <li><strong>Надежность</strong> - рейтинг А+ от ведущих агентств</li>
            <li><strong>Доступность</strong> - офисы в 80+ городах и онлайн-оформление</li>
          </ul>

          <h2>Наши партнеры</h2>
          <div className="partners">
            <span>Сбербанк</span>
            <span>Тинькофф</span>
            <span>Альфа-Банк</span>
            <span>Росгосстрах</span>
            <span>Ингосстрах</span>
          </div>
        </div>
      </div>
    </div>
  )
}