import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const achievements = await sql`SELECT * FROM achievements ORDER BY id DESC`;
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const title = data.get('title');
    const description = data.get('description');
    const file = data.get('image');
    let imageUrl = null;

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `achieve-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    await sql`
      INSERT INTO achievements (title, description, image_url)
      VALUES (${title}, ${description}, ${imageUrl})
    `;
    return NextResponse.json({ message: "Achievement added" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.formData();
    const id = data.get('id');
    const title = data.get('title');
    const description = data.get('description');
    const file = data.get('image');
    let imageUrl = data.get('existingImage');

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `achieve-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    await sql`
      UPDATE achievements 
      SET title = ${title}, description = ${description}, image_url = ${imageUrl}
      WHERE id = ${id}
    `;
    return NextResponse.json({ message: "Achievement updated" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await sql`DELETE FROM achievements WHERE id = ${id}`;
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}