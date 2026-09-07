import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const members = await sql`SELECT * FROM team_members ORDER BY id ASC`;
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const role = data.get('role');
    const category = data.get('category');
    const file = data.get('image');

    let imageUrl = null;

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Content = buffer.toString('base64');
      
      const filename = `profile-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
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
      INSERT INTO team_members (name, role, category, image_url)
      VALUES (${name}, ${role}, ${category}, ${imageUrl})
    `;
    return NextResponse.json({ message: "Team member added" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.formData();
    const id = data.get('id');
    const name = data.get('name');
    const role = data.get('role');
    const category = data.get('category');
    const file = data.get('image');

    let imageUrl = data.get('existingImage');

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Content = buffer.toString('base64');
      
      const filename = `profile-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
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
      UPDATE team_members 
      SET name = ${name}, role = ${role}, category = ${category}, image_url = ${imageUrl}
      WHERE id = ${id}
    `;
    return NextResponse.json({ message: "Member updated" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await sql`DELETE FROM team_members WHERE id = ${id}`;
    return NextResponse.json({ message: "Member deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}