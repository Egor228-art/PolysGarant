"use client";
export const dynamic = 'force-dynamic'
export default function ContactsPage() {
  return (
    <div className="contacts-page">
      <div className="page-hero">
        <h1>Контакты</h1>
        <p>Свяжитесь с нами любым удобным способом</p>
      </div>

      <div className="container">
        <div className="contacts-grid">
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Телефон горячей линии</h3>
            <p>8-800-555-35-35</p>
            <p>Бесплатно по России</p>
            <p>Ежедневно 9:00-21:00</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3>Email</h3>
            <p>info@polisgarant.ru</p>
            <p>support@polisgarant.ru</p>
            <p>Ответ в течение 24 часов</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>Мессенджеры</h3>
            <p>Telegram: @polisgarant</p>
            <p>WhatsApp: +7-999-123-45-67</p>
            <p>Viber: +7-999-123-45-67</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Головной офис</h3>
            <p>г. Москва, ул. Страховая, д. 15</p>
            <p>м. Динамо, выход к ТЦ</p>
            <p>Пн-Пт: 10:00-19:00</p>
          </div>
        </div>

        <div className="map-container">
          <h3>Мы на карте</h3>
          <div className="map-placeholder">
            🗺️ Карта с расположением офиса
          </div>
        </div>
      </div>
    </div>
  )
}