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
    
    // The frontend sends both images and videos under the 'image' and 'existingImage' keys
    const file = data.get('image');
    let mediaUrl = data.get('existingImage');

    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Convert binary file to base64 for GitHub API compatibility
      const base64Content = buffer.toString('base64');
      
      // Strictly sanitize the filename to ensure video/image extensions map cleanly in the URL
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const filename = `about-media-${Date.now()}-${sanitizedFileName}`;
      const path = `public/uploads/${filename}`;
      
      const githubOwner = process.env.GITHUB_USERNAME;
      const githubRepo = process.env.GITHUB_REPO;
      
      const githubResponse = await fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          message: `Upload media asset ${filename}`, 
          content: base64Content 
        }),
      });

      if (!githubResponse.ok) {
        const errorDetails = await githubResponse.text();
        console.error('GitHub API Upload Error:', errorDetails);
        throw new Error('GitHub API Error: Failed to upload media asset.');
      }
      
      // Update the URL to the raw GitHub content path
      mediaUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/main/${path}`;
    }

    // Update the database record (maintaining the 'image_url' column name for frontend compatibility)
    await sql`
      UPDATE about_content 
      SET 
        vision = ${vision}, 
        about_text = ${about_text}, 
        objectives = ${objectives}::jsonb, 
        image_url = ${mediaUrl}, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `;

    return NextResponse.json({ message: "Institutional content updated successfully" });
  } catch (error) {
    console.error("Server API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}