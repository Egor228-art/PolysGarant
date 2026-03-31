"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

function HomeContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [calcType, setCalcType] = useState("auto");
  const [calcAmount, setCalcAmount] = useState(1000000);
  const [calcResult, setCalcResult] = useState(null);

  if (status === "loading") return <div style={{ textAlign: "center", padding: "4rem" }}>Загрузка...</div>;
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
      else {
        setIsModalOpen(false);
        router.push("/dashboard");
      }
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
        setIsModalOpen(false);
        router.push("/dashboard");
      }
    }
  };

  const calculatePrice = () => {
    const rates = { auto: 0.03, property: 0.005, health: 0.08, travel: 0.04 };
    const price = calcAmount * (rates[calcType] || 0.03);
    setCalcResult(price);
  };

  return (
    <div>
      <div className="hero">
        <h1>Защитите то, что цените</h1>
        <p>Надежная страховая защита для вас, вашей семьи и имущества</p>
        <button className="btn" onClick={() => setIsModalOpen(true)} style={{ marginTop: "2rem", fontSize: "1.1rem", padding: "1rem 2rem" }}>
          Войти в личный кабинет
        </button>
      </div>

      {/* Калькулятор */}
      <div className="form-container" style={{ marginTop: 0, background: "linear-gradient(135deg, var(--yellow) 0%, var(--orange) 100%)", color: "white" }}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem", color: "white" }}>💰 Калькулятор страховки</h3>
        <select 
          value={calcType} 
          onChange={(e) => setCalcType(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: 'none', borderRadius: '0.75rem', marginBottom: '1rem', background: 'white', color: '#333' }}
        >
          <option value="auto">🚗 Автострахование (3% от суммы)</option>
          <option value="property">🏠 Недвижимость (0.5% от суммы)</option>
          <option value="health">❤️ ДМС (8% от суммы)</option>
          <option value="travel">✈️ Путешествия (4% от суммы)</option>
        </select>
        <input 
          type="number" 
          value={calcAmount} 
          onChange={(e) => setCalcAmount(Number(e.target.value))}
          placeholder="Страховая сумма (₽)"
          style={{ background: 'white', color: '#333' }}
        />
        <button onClick={calculatePrice} style={{ width: '100%', background: 'white', color: '#667eea', boxShadow: 'none' }}>
          Рассчитать стоимость
        </button>
        {calcResult && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '0.75rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Стоимость полиса:</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{calcResult.toLocaleString()} ₽</p>
            <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>в год</p>
          </div>
        )}
      </div>

      {/* Услуги */}
      <div className="grid">
        <div className="card">
          <h3>🚗 Автострахование</h3>
          <p>ОСАГО и КАСКО с кэшбэком до 15%</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--orange)' }}>от 5 000 ₽</p>
          <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Оформить</button>
        </div>
        <div className="card">
          <h3>🏠 Недвижимость</h3>
          <p>Защита от пожара, затопления и взлома</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--orange)' }}>от 3 000 ₽</p>
          <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Оформить</button>
        </div>
        <div className="card">
          <h3>❤️ Здоровье</h3>
          <p>ДМС с покрытием по всей России</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--orange)' }}>от 15 000 ₽</p>
          <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Оформить</button>
        </div>
        <div className="card">
          <h3>✈️ Путешествия</h3>
          <p>Медицинская помощь за границей</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--orange)' }}>от 1 500 ₽</p>
          <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Оформить</button>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }} onClick={() => setIsModalOpen(false)}>
          <div className="form-container" style={{ maxWidth: '450px', width: '100%', margin: 0, position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                fontSize: '1.5rem',
                padding: 0,
                width: '2rem',
                height: '2rem',
                boxShadow: 'none',
                color: '#80806b'
              }}
            >
              ×
            </button>
            
            <div className="form-tabs">
              <button className={`tab-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Вход</button>
              <button className={`tab-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Регистрация</button>
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
              {error && <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</p>}
              <button type="submit" style={{ width: "100%" }}>
                {isLogin ? "Войти" : "Зарегистрироваться"}
              </button>
            </form>
            
            <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#807c6b" }}>
              {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                style={{ background: "none", color: "var(--orange)", padding: 0, boxShadow: "none", display: "inline" }}
              >
                {isLogin ? "Зарегистрироваться" : "Войти"}
              </button>
            </p>
          </div>
        </div>
      )}
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