import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const announcements = await sql`SELECT * FROM announcements ORDER BY announcement_date DESC`;
    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, details, date } = await request.json();
    await sql`
      INSERT INTO announcements (title, details, announcement_date)
      VALUES (${title}, ${details}, ${date})
    `;
    return NextResponse.json({ message: "Announcement added successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, title, details, date } = await request.json();
    await sql`
      UPDATE announcements 
      SET title = ${title}, details = ${details}, announcement_date = ${date}
      WHERE id = ${id}
    `;
    return NextResponse.json({ message: "Announcement updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await sql`DELETE FROM announcements WHERE id = ${id}`;
    return NextResponse.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}