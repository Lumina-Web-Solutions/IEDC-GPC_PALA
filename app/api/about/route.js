import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`SELECT * FROM about_content WHERE id = 1`;
    return NextResponse.json(result[0] || null);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.formData();
    const vision = data.get('vision');
    const about_text = data.get('about_text');
    const objectives = data.get('objectives');
    const file = data.get('image');
    
    let imageUrl = data.get('existingImage');

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Content = buffer.toString('base64');
      
      const filename = `about-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
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
      UPDATE about_content 
      SET vision = ${vision}, about_text = ${about_text}, objectives = ${objectives}::jsonb, image_url = ${imageUrl}, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `;

    return NextResponse.json({ message: "Content updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}