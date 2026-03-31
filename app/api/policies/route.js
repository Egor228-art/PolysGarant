import { getUserPolicies, createPolicy } from "../../lib";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }
    
    const policies = await getUserPolicies(session.user.id);
    return NextResponse.json({ success: true, policies });
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
    
    const { type, amount, duration } = await request.json();
    const policy = await createPolicy(session.user.id, type, amount, duration);
    
    return NextResponse.json({ success: true, policy });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}