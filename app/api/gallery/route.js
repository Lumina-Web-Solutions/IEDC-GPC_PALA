import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Fetch all gallery images
export async function GET() {
  try {
    const photos = await sql`SELECT * FROM gallery ORDER BY created_at DESC`;
    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Upload a new gallery image
export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('image');
    
    if (!file || file === 'undefined') {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `gallery-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    await writeFile(filepath, buffer);
    
    const imageUrl = `/uploads/${filename}`;

    await sql`INSERT INTO gallery (image_url) VALUES (${imageUrl})`;
    
    return NextResponse.json({ message: "Photo added to gallery" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a gallery image
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await sql`DELETE FROM gallery WHERE id = ${id}`;
    return NextResponse.json({ message: "Photo deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}