import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// Функция для поиска пользователя по email
export async function getUserByEmail(email) {
  try {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows[0];
  } catch (error) {
    console.error('Ошибка БД:', error);
    return null;
  }
}

// Создание пользователя (хэш пароля)
export async function createUser(email, password, name = 'Клиент') {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { rows } = await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name})
      RETURNING id, email, name
    `;
    return rows[0];
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    throw error;
  }
}

// SQL запрос для создания таблицы (выполнить вручную один раз в панели Vercel)
export const initTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;