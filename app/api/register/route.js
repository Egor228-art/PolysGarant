import { createUser, getUserByEmail } from "@/app/lib";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "Заполните поля" }, { status: 400 });
    }
    
    // Проверка, существует ли уже
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "Email уже зарегистрирован" }, { status: 400 });
    }
    
    const newUser = await createUser(email, password, name);
    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}