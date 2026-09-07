import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

// Fetch messages for the admin panel
export async function GET() {
  try {
    const messages = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Submit a new message from the public website
export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    
    await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;
    
    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a message (Admin only)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await sql`DELETE FROM contact_messages WHERE id = ${id}`;
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}