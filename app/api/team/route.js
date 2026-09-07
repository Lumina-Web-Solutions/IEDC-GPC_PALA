import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Fetch all team members
export async function GET() {
  try {
    const members = await sql`SELECT * FROM team_members ORDER BY id ASC`;
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add a new team member
export async function POST(request) {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const role = data.get('role');
    const category = data.get('category'); // 'Faculty' or 'Student'
    const file = data.get('image');

    let imageUrl = null;

    // Handle profile photo upload
    if (file && file !== 'undefined' && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const filename = `profile-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    // Insert into NeonDB
    await sql`
      INSERT INTO team_members (name, role, category, image_url)
      VALUES (${name}, ${role}, ${category}, ${imageUrl})
    `;

    return NextResponse.json({ message: "Team member added successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Delete a team member
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await sql`DELETE FROM team_members WHERE id = ${id}`;
    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a team member
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
      const filename = `profile-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    await sql`
      UPDATE team_members 
      SET name = ${name}, role = ${role}, category = ${category}, image_url = ${imageUrl}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: "Member updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}