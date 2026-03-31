import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// Функция для автоматического создания всех таблиц
export async function initTables() {
  try {
    // Таблица пользователей
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Таблица полисов
    await sql`
      CREATE TABLE IF NOT EXISTS policies (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        policy_number VARCHAR(100) UNIQUE NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Таблица обращений
    await sql`
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('✅ Все таблицы созданы/проверены');
    return true;
  } catch (error) {
    console.error('❌ Ошибка при создании таблиц:', error.message);
    return false;
  }
}

// Вызываем инициализацию при импорте
initTables();

// Пользователи
export async function getUserByEmail(email) {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows[0];
  } catch (error) {
    console.error('Ошибка поиска:', error.message);
    return null;
  }
}

export async function createUser(email, password, name = 'Клиент') {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name})
      RETURNING id, email, name
    `;
    return rows[0];
  } catch (error) {
    console.error('Ошибка создания:', error.message);
    throw error;
  }
}

// Полисы
export async function getUserPolicies(userId) {
  try {
    const { rows } = await sql`
      SELECT * FROM policies 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Ошибка получения полисов:', error.message);
    return [];
  }
}

export async function createPolicy(userId, type, amount, durationMonths = 12) {
  try {
    const policyNumber = `POL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);
    
    const { rows } = await sql`
      INSERT INTO policies (user_id, type, policy_number, start_date, end_date, amount)
      VALUES (${userId}, ${type}, ${policyNumber}, ${startDate.toISOString().split('T')[0]}, ${endDate.toISOString().split('T')[0]}, ${amount})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Ошибка создания полиса:', error.message);
    throw error;
  }
}

// Обращения
export async function getUserTickets(userId) {
  try {
    const { rows } = await sql`
      SELECT * FROM tickets 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Ошибка получения обращений:', error.message);
    return [];
  }
}

export async function createTicket(userId, subject, message) {
  try {
    const { rows } = await sql`
      INSERT INTO tickets (user_id, subject, message)
      VALUES (${userId}, ${subject}, ${message})
      RETURNING *
    `;
    return rows;
  } catch (error) {
    console.error('Ошибка создания обращения:', error.message);
    throw error;
  }
}