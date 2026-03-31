import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// Функция для создания таблицы (выполняется автоматически)
export async function initTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Таблица users готова');
    return true;
  } catch (error) {
    console.error('❌ Ошибка при создании таблицы:', error.message);
    return false;
  }
}

// Функция для поиска пользователя по email
export async function getUserByEmail(email) {
  try {
    await initTable();
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows[0];
  } catch (error) {
    console.error('Ошибка поиска:', error.message);
    return null;
  }
}

// Создание пользователя
export async function createUser(email, password, name = 'Клиент') {
  try {
    await initTable();
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