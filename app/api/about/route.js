import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Fetch the about content
export async function GET() {
  try {
    const result = await sql`SELECT * FROM about_content WHERE id = 1`;
    return NextResponse.json(result[0] || null);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update the about content
export async function PUT(request) {
  try {
    const data = await request.formData();
    const vision = data.get('vision');
    const about_text = data.get('about_text');
    const objectives = data.get('objectives'); // JSON string array
    const file = data.get('image');
    
    let imageUrl = data.get('existingImage');

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `about-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    await sql`
      UPDATE about_content 
      SET vision = ${vision}, about_text = ${about_text}, objectives = ${objectives}::jsonb, image_url = ${imageUrl}, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `;

    return NextResponse.json({ message: "Content updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}