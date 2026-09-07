import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const photos = await sql`SELECT * FROM gallery ORDER BY created_at DESC`;
    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Upload a new gallery image via GitHub API
export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('image');
    
    if (!file || file === 'undefined') {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert the image to base64 format for the GitHub API
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Content = buffer.toString('base64');
    
    const filename = `gallery-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const path = `public/uploads/${filename}`;
    
    const githubOwner = process.env.GITHUB_USERNAME;
    const githubRepo = process.env.GITHUB_REPO;
    const githubToken = process.env.GITHUB_TOKEN;

    // Push the image to your GitHub repo
    const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`;
    const githubResponse = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Admin Portal: Uploaded ${filename}`,
        content: base64Content,
      }),
    });

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      throw new Error(`GitHub API Error: ${errorData.message}`);
    }

    // IMPORTANT: Change 'main' to 'master' below if your default GitHub branch is named master!
    const imageUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/main/${path}`;

    // Save the direct URL to the database
    await sql`INSERT INTO gallery (image_url) VALUES (${imageUrl})`;
    
    return NextResponse.json({ message: "Photo added to gallery" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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