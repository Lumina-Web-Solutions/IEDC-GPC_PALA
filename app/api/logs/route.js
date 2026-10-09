import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, action } = body;

    // Validate input
    if (!email || !action) {
      return NextResponse.json(
        {
          error: 'Missing required fields: email and action',
        },
        { status: 400 }
      );
    }

    // Insert audit log
    const result = await sql`
      INSERT INTO system_logs (user_email, action)
      VALUES (${email}, ${action})
      RETURNING *;
    `;

    return NextResponse.json(
      {
        message: 'SUCCESS: Audit log recorded.',
        log: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('System Audit Logging Error:', error);

    return NextResponse.json(
      {
        error: 'ERROR: Failed to record audit log.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch latest 100 logs
    const logs = await sql`
      SELECT *
      FROM system_logs
      ORDER BY created_at DESC
      LIMIT 100;
    `;

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch logs:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch logs',
      },
      { status: 500 }
    );
  }
}
