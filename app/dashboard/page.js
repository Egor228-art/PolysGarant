"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [policies, setPolicies] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (session?.user?.id) {
      fetchPolicies();
      fetchTickets();
    }
  }, [session]);

  const fetchPolicies = async () => {
    const res = await fetch('/api/policies');
    const data = await res.json();
    if (data.success) setPolicies(data.policies);
  };

  const fetchTickets = async () => {
    const res = await fetch('/api/tickets');
    const data = await res.json();
    if (data.success) setTickets(data.tickets);
  };

  if (status === "loading") return <div style={{ textAlign: "center", padding: "4rem" }}>Загрузка...</div>;
  if (!session) {
    router.push("/");
    return null;
  }

  const getTypeName = (type) => {
    const types = {
      auto: '🚗 Автострахование',
      property: '🏠 Недвижимость',
      health: '❤️ Здоровье',
      travel: '✈️ Путешествия'
    };
    return types[type] || type;
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: { background: '#10b981', color: 'white' },
      expired: { background: '#ef4444', color: 'white' },
      pending: { background: '#f59e0b', color: 'white' },
      new: { background: '#3b82f6', color: 'white' },
      in_progress: { background: '#f59e0b', color: 'white' },
      resolved: { background: '#10b981', color: 'white' }
    };
    const names = {
      active: 'Активен',
      expired: 'Истек',
      pending: 'На рассмотрении',
      new: 'Новое',
      in_progress: 'В обработке',
      resolved: 'Решено'
    };
    return (
      <span style={{ background: styles[status]?.background || '#6b7280', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem' }}>
        {names[status] || status}
      </span>
    );
  };

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h2>Добро пожаловать, {session.user.name || session.user.email.split('@')[0]}!</h2>
          <div className="user-email">📧 {session.user.email}</div>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/" })} style={{ background: "#ef4444" }}>
          Выйти
        </button>
      </div>

      <div className="form-tabs" style={{ marginBottom: '2rem' }}>
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          📊 Обзор
        </button>
        <button className={`tab-btn ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')}>
          📄 Мои полисы ({policies.length})
        </button>
        <button className={`tab-btn ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => setActiveTab('tickets')}>
          💬 Обращения ({tickets.length})
        </button>
        <button className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>
          ➕ Оформить полис
        </button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid">
            <div className="card">
              <h3>📄 Активные полисы</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{policies.filter(p => p.status === 'active').length}</p>
              <button onClick={() => setActiveTab('policies')}>Управлять</button>
            </div>
            <div className="card">
              <h3>💬 Открытые обращения</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{tickets.filter(t => t.status !== 'resolved').length}</p>
              <button onClick={() => setActiveTab('tickets')}>Смотреть</button>
            </div>
            <div className="card">
              <h3>🏆 Скидка за лояльность</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>15%</p>
              <p>На следующий полис</p>
            </div>
          </div>
          
          <div className="card" style={{ marginTop: '2rem' }}>
            <h3>⚡ Быстрые действия</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button onClick={() => setActiveTab('new')}>Оформить новый полис</button>
              <button onClick={() => setActiveTab('tickets')}>Создать обращение</button>
              <button>Загрузить документы</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div>
          {policies.length === 0 ? (
            <div className="card" style={{ textAlign: 'center' }}>
              <p>У вас пока нет оформленных полисов</p>
              <button onClick={() => setActiveTab('new')}>Оформить первый полис</button>
            </div>
          ) : (
            <div className="grid">
              {policies.map(policy => (
                <div key={policy.id} className="card">
                  <h3>{getTypeName(policy.type)}</h3>
                  <p><strong>№ полиса:</strong> {policy.policy_number}</p>
                  <p><strong>Сумма:</strong> {policy.amount.toLocaleString()} ₽</p>
                  <p><strong>Период:</strong> {new Date(policy.start_date).toLocaleDateString()} - {new Date(policy.end_date).toLocaleDateString()}</p>
                  <p>{getStatusBadge(policy.status)}</p>
                  <button style={{ marginTop: '1rem', background: 'transparent', color: '#667eea', border: '2px solid #667eea' }}>
                    Скачать полис
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'tickets' && (
        <div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>Создать новое обращение</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  subject: formData.get('subject'),
                  message: formData.get('message')
                })
              });
              if (res.ok) {
                fetchTickets();
                e.target.reset();
              }
            }}>
              <input name="subject" placeholder="Тема обращения" required />
              <textarea name="message" placeholder="Сообщение" rows="4" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', marginBottom: '1rem' }} required />
              <button type="submit">Отправить</button>
            </form>
          </div>
          
          {tickets.length === 0 ? (
            <div className="card" style={{ textAlign: 'center' }}>
              <p>У вас пока нет обращений</p>
            </div>
          ) : (
            tickets.map(ticket => (
              <div key={ticket.id} className="card" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <h3>{ticket.subject}</h3>
                  {getStatusBadge(ticket.status)}
                </div>
                <p>{ticket.message}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '1rem' }}>
                  {new Date(ticket.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'new' && (
        <div className="form-container">
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Оформление полиса</h3>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const res = await fetch('/api/policies', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: formData.get('type'),
                amount: parseInt(formData.get('amount')),
                duration: parseInt(formData.get('duration'))
              })
            });
            if (res.ok) {
              fetchPolicies();
              setActiveTab('policies');
            }
          }}>
            <select name="type" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', marginBottom: '1rem' }} required>
              <option value="">Выберите тип страхования</option>
              <option value="auto">🚗 Автострахование (ОСАГО/КАСКО)</option>
              <option value="property">🏠 Страхование недвижимости</option>
              <option value="health">❤️ Добровольное медицинское страхование</option>
              <option value="travel">✈️ Страхование путешествий</option>
            </select>
            <input name="amount" type="number" placeholder="Страховая сумма (₽)" required />
            <select name="duration" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', marginBottom: '1rem' }} required>
              <option value="12">12 месяцев</option>
              <option value="6">6 месяцев</option>
              <option value="3">3 месяца</option>
            </select>
            <button type="submit" style={{ width: '100%' }}>Оформить полис</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}