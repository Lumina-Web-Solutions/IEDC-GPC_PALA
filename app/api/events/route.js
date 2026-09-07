import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const events = await sql`SELECT * FROM events ORDER BY event_date DESC`;
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const title = data.get('title');
    const description = data.get('description');
    const event_date = data.get('date');
    const links = data.get('links');
    const file = data.get('image');

    let imageUrl = null;

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Content = buffer.toString('base64');
      
      const filename = `event-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const path = `public/uploads/${filename}`;
      const githubOwner = process.env.GITHUB_USERNAME;
      const githubRepo = process.env.GITHUB_REPO;
      
      const githubResponse = await fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Upload ${filename}`, content: base64Content }),
      });

      if (!githubResponse.ok) throw new Error('GitHub API Error');
      imageUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/main/${path}`;
    }

    await sql`
      INSERT INTO events (title, description, event_date, image_url, links)
      VALUES (${title}, ${description}, ${event_date}, ${imageUrl}, ${links}::jsonb)
    `;
    return NextResponse.json({ message: "Event created" });
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
    const event_date = data.get('date');
    const links = data.get('links');
    const file = data.get('image');

    let imageUrl = data.get('existingImage');

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Content = buffer.toString('base64');
      
      const filename = `event-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const path = `public/uploads/${filename}`;
      const githubOwner = process.env.GITHUB_USERNAME;
      const githubRepo = process.env.GITHUB_REPO;
      
      const githubResponse = await fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Upload ${filename}`, content: base64Content }),
      });

      if (!githubResponse.ok) throw new Error('GitHub API Error');
      imageUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/main/${path}`;
    }

    await sql`
      UPDATE events 
      SET title = ${title}, description = ${description}, event_date = ${event_date}, image_url = ${imageUrl}, links = ${links}::jsonb
      WHERE id = ${id}
    `;
    return NextResponse.json({ message: "Event updated" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await sql`DELETE FROM events WHERE id = ${id}`;
    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}