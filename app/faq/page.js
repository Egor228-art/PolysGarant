"use client";
export const dynamic = 'force-dynamic'
import { useState } from 'react'

const faqs = [
  {
    question: 'Как оформить полис онлайн?',
    answer: 'Оформить полис онлайн очень просто: зарегистрируйтесь в личном кабинете, выберите нужный продукт, заполните данные и оплатите. Полис придет на email в течение 5 минут.'
  },
  {
    question: 'Какие документы нужны для получения выплаты?',
    answer: 'Для получения выплаты необходимо предоставить заявление, паспорт, полис, документы подтверждающие страховой случай (справка из ГИБДД, заключение врача и т.д.)'
  },
  {
    question: 'Сколько времени занимает выплата?',
    answer: 'Стандартный срок выплаты составляет до 15 рабочих дней. В большинстве случаев выплата производится в течение 3-5 дней.'
  },
  {
    question: 'Можно ли вернуть полис?',
    answer: 'Да, вы можете вернуть полис в течение 14 дней с момента оформления. Возврат осуществляется в полном объеме за вычетом дней, прошедших с начала действия полиса.'
  },
  {
    question: 'Работаете ли вы с юридическими лицами?',
    answer: 'Да, мы предлагаем полный спектр страховых услуг для бизнеса: страхование имущества, ответственности, сотрудников и другие корпоративные программы.'
  },
  {
    question: 'Как изменить данные в полисе?',
    answer: 'Изменить данные можно в личном кабинете или обратившись в службу поддержки. Для изменения данных может потребоваться подтверждающий документ.'
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="faq-page">
      <div className="page-hero">
        <h1>Часто задаваемые вопросы</h1>
        <p>Ответы на самые популярные вопросы</p>
      </div>

      <div className="container">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div 
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h3>Не нашли ответ?</h3>
          <p>Свяжитесь с нашей службой поддержки</p>
          <button className="btn" onClick={() => window.location.href = '/contacts'}>
            Задать вопрос
          </button>
        </div>
      </div>
    </div>
  )
}