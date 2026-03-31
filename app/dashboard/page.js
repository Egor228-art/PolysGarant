"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div className="container">Загрузка...</div>;
  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <h1>Добро пожаловать, {session.user.email}!</h1>
        <button onClick={() => signOut({ callbackUrl: "/" })} style={{ background: "#dc2626" }}>Выйти</button>
      </div>
      <div className="grid" style={{ marginTop: "2rem" }}>
        <div className="card"><h3>Мои полисы</h3><p>У вас пока нет активных полисов. Оформите новый!</p><button>Оформить ОСАГО</button></div>
        <div className="card"><h3>Обращения</h3><p>Статус последнего обращения: рассмотрение</p><button>Задать вопрос</button></div>
        <div className="card"><h3>Скидка за безаварийность</h3><p>Ваша скидка: 15%</p></div>
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