import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Make sure this matches your actual DB import path

// POST: Save a new log entry
export async function POST(req) {
  try {
    const { email, action } = await req.json();

    if (!email || !action) {
      return NextResponse.json({ error: 'Missing email or action' }, { status: 400 });
    }

    // Execute the insert query
    const query = `
      INSERT INTO system_logs (user_email, action) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    
    await db.query(query, [email, action]);

    return NextResponse.json({ message: 'Log recorded successfully' }, { status: 201 });
  } catch (error) {
    console.error('SERVER LOGGING ERROR:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch logs for the dashboard
export async function GET() {
  try {
    const query = `SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 100`;
    const result = await db.query(query);
    
    // Depending on your db library, rows might be in result.rows or just result
    const rows = result.rows || result; 

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('SERVER FETCH LOGS ERROR:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
