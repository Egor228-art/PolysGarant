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
      </div>

      {/* Калькулятор */}
      <div className="form-container" style={{ marginTop: 0 }}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>📊 Калькулятор страховки</h3>
        <select 
          value={calcType} 
          onChange={(e) => setCalcType(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', marginBottom: '1rem' }}
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
        />
        <button onClick={calculatePrice} style={{ width: '100%' }}>Рассчитать стоимость</button>
        {calcResult && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.75rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Стоимость полиса:</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>{calcResult.toLocaleString()} ₽/год</p>
          </div>
        )}
      </div>

      {/* Услуги */}
      <div className="grid">
        <div className="card">
          <h3>🚗 Автострахование</h3>
          <p>ОСАГО и КАСКО с кэшбэком до 15%</p>
          <button className="btn-outline" onClick={() => setIsLogin(false)}>от 5 000 ₽</button>
        </div>
        <div className="card">
          <h3>🏠 Недвижимость</h3>
          <p>Защита от пожара, затопления и взлома</p>
          <button className="btn-outline" onClick={() => setIsLogin(false)}>от 3 000 ₽</button>
        </div>
        <div className="card">
          <h3>❤️ Здоровье</h3>
          <p>ДМС с покрытием по всей России</p>
          <button className="btn-outline" onClick={() => setIsLogin(false)}>от 15 000 ₽</button>
        </div>
        <div className="card">
          <h3>✈️ Путешествия</h3>
          <p>Медицинская помощь за границей</p>
          <button className="btn-outline" onClick={() => setIsLogin(false)}>от 1 500 ₽</button>
        </div>
      </div>

      {/* Форма входа/регистрации */}
      <div className="form-container">
        <div className="form-tabs">
          <button className={`tab-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Вход</button>
          <button className={`tab-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Регистрация</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && <input type="text" placeholder="Ваше имя" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />}
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Пароль" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          {error && <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</p>}
          <button type="submit" style={{ width: "100%" }}>{isLogin ? "Войти" : "Зарегистрироваться"}</button>
        </form>
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