
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    const { email, action } = await req.json();

    

    return NextResponse.json({ message: 'Log recorded' }, { status: 200 });
  } catch (error) {
    console.error('Logging Error:', error);
    return NextResponse.json({ error: 'Failed to record log' }, { status: 500 });
  }
}
