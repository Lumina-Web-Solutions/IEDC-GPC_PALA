import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Fetch all events
export async function GET() {
  try {
    const events = await sql`SELECT * FROM events ORDER BY event_date DESC`;
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new event with image upload
export async function POST(request) {
  try {
    const data = await request.formData();
    const title = data.get('title');
    const description = data.get('description');
    const event_date = data.get('date');
    const links = data.get('links'); // This will be a JSON string
    const file = data.get('image');

    let imageUrl = null;

    // Handle Image Upload to public/uploads
    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create unique filename to prevent overwriting
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    // Insert into NeonDB
    await sql`
      INSERT INTO events (title, description, event_date, image_url, links)
      VALUES (${title}, ${description}, ${event_date}, ${imageUrl}, ${links}::jsonb)
    `;

    return NextResponse.json({ message: "Event created successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Delete an event
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await sql`DELETE FROM events WHERE id = ${id}`;
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update an event
export async function PUT(request) {
  try {
    const data = await request.formData();
    const id = data.get('id');
    const title = data.get('title');
    const description = data.get('description');
    const event_date = data.get('date');
    const links = data.get('links');
    const file = data.get('image');

    let imageUrl = data.get('existingImage'); // Keep old image by default

    // If a new image is uploaded, process it
    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    await sql`
      UPDATE events 
      SET title = ${title}, description = ${description}, event_date = ${event_date}, image_url = ${imageUrl}, links = ${links}::jsonb
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: "Event updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}