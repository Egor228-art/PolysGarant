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

  if (status === "loading") return <div className="container" style={{ textAlign: "center", padding: "4rem" }}>Загрузка...</div>;
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
    <div>
      {/* Герой секция */}
      <div className="hero">
        <h1>Защитите то, что цените</h1>
        <p>Надежная страховая защита для вас, вашей семьи и имущества. Лучшие тарифы и быстрая выплата</p>
      </div>

      {/* Карточки услуг */}
      <div className="grid">
        <div className="card">
          <h3>🚗 Автострахование</h3>
          <p>ОСАГО и КАСКО с кэшбэком до 15%. Защита от угона, ДТП и повреждений</p>
          <button className="btn-outline" onClick={() => setIsLogin(false)}>Оформить от 5000 ₽</button>
        </div>
        <div className="card">
          <h3>🏠 Недвижимость</h3>
          <p>Защита квартир и домов от пожара, затопления, стихийных бедствий и незаконного проникновения</p>
          <button className="btn-outline" onClick={() => setIsLogin(false)}>Рассчитать стоимость</button>
        </div>
        <div className="card">
          <h3>❤️ Здоровье</h3>
          <p>ДМС с покрытием по всей России. Программы для взрослых, детей и всей семьи</p>
          <button className="btn-outline" onClick={() => setIsLogin(false)}>Выбрать программу</button>
        </div>
        <div className="card">
          <h3>✈️ Путешествия</h3>
          <p>Страхование для поездок за границу. Медицинская помощь, багаж, отмена поездки</p>
          <button className="btn-outline" onClick={() => setIsLogin(false)}>Оформить онлайн</button>
        </div>
      </div>

      {/* Форма входа/регистрации */}
      <div className="form-container">
        <div className="form-tabs">
          <button 
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Вход
          </button>
          <button 
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Ваше имя" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            placeholder="Пароль" 
            value={formData.password} 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
          {error && <p style={{ color: "#dc2626", marginBottom: "1rem", textAlign: "center" }}>{error}</p>}
          <button type="submit" style={{ width: "100%" }}>
            {isLogin ? "Войти в личный кабинет" : "Зарегистрироваться"}
          </button>
        </form>
        
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
          {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: "none", color: "#667eea", padding: 0, boxShadow: "none", display: "inline" }}
          >
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}