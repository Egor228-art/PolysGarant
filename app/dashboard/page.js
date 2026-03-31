"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div className="container" style={{ textAlign: "center", padding: "4rem" }}>Загрузка...</div>;
  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h2 style={{ marginBottom: "0.5rem" }}>Добро пожаловать, {session.user.name || session.user.email.split('@')[0]}!</h2>
          <div className="user-email">
            📧 {session.user.email}
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/" })} style={{ background: "#ef4444", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)" }}>
          Выйти
        </button>
      </div>
      
      <div className="grid">
        <div className="card">
          <h3>📄 Мои полисы</h3>
          <p>У вас пока нет активных полисов. Оформите новый прямо сейчас!</p>
          <button>Оформить ОСАГО</button>
        </div>
        
        <div className="card">
          <h3>💬 Обращения</h3>
          <p>Статус последнего обращения: рассмотрение</p>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>№ З-12345 от 31.03.2024</p>
          <button style={{ marginTop: "1rem", background: "transparent", color: "#667eea", boxShadow: "none", border: "2px solid #667eea" }}>
            Задать вопрос
          </button>
        </div>
        
        <div className="card">
          <h3>🏆 Скидка за безаварийность</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>15%</p>
          <p>Ваш стаж безаварийной езды: 3 года</p>
        </div>
        
        <div className="card">
          <h3>⚡ Быстрая выплата</h3>
          <p>Среднее время выплаты: 3 дня</p>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>98% клиентов довольны обслуживанием</p>
        </div>
      </div>
      
      <div style={{ marginTop: "2rem", padding: "1.5rem", background: "white", borderRadius: "1.5rem", textAlign: "center" }}>
        <h3>🎁 Специальное предложение</h3>
        <p>При оформлении двух полисов - скидка 20% на второй!</p>
        <button>Подробнее</button>
      </div>
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