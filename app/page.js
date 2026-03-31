"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

function HomeContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  if (status === "loading") return <div className="container">Загрузка...</div>;
  if (session) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (isLogin) {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (res?.error) setError("Неверный email или пароль");
      else router.push("/dashboard");
    } else {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else {
        // Авто-вход после регистрации
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="container">
      {/* Секция герой - тематический дизайн */}
      <section style={{ textAlign: "center", margin: "2rem 0" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}>Защитите то, что цените</h1>
        <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>ОСАГО, Каско, Недвижимость и Здоровье — лучшие тарифы</p>
      </section>

      {/* Резиновая сетка с услугами */}
      <div className="grid">
        <div className="card"><h3>🚗 Автострахование</h3><p>ОСАГО и КАСКО с кэшбэком до 15%</p></div>
        <div className="card"><h3>🏠 Недвижимость</h3><p>Квартиры, дома от затопления и пожара</p></div>
        <div className="card"><h3>❤️ Здоровье</h3><p>ДМС с покрытием по всей России</p></div>
      </div>

      {/* Форма входа/регистрации */}
      <div style={{ maxWidth: "400px", margin: "3rem auto", background: "white", padding: "2rem", borderRadius: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <button onClick={() => setIsLogin(true)} style={{ flex: 1, background: isLogin ? "#2c7da0" : "#e5e7eb", color: isLogin ? "white" : "black" }}>Вход</button>
          <button onClick={() => setIsLogin(false)} style={{ flex: 1, background: !isLogin ? "#2c7da0" : "#e5e7eb", color: !isLogin ? "white" : "black" }}>Регистрация</button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && <input type="text" placeholder="Ваше имя" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />}
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Пароль" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ width: "100%" }}>{isLogin ? "Войти" : "Зарегистрироваться"}</button>
        </form>
      </div>
    </div>
  );
}

// Обертка SessionProvider
export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}