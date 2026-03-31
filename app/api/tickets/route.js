import { getUserTickets, createTicket } from "../../lib";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }
    
    const tickets = await getUserTickets(session.user.id);
    return NextResponse.json({ success: true, tickets });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }
    
    const { subject, message } = await request.json();
    const ticket = await createTicket(session.user.id, subject, message);
    
    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}