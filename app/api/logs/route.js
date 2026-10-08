import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
    const result = await db.query(
      `
        INSERT INTO system_logs (user_email, action)
        VALUES ($1, $2)
        RETURNING *;
      `,
      [email, action]
    );

    return NextResponse.json(
      {
        message: 'SUCCESS: Audit log recorded.',
        log: result.rows[0],
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
    const result = await db.query(
      `
        SELECT *
        FROM system_logs
        ORDER BY created_at DESC
        LIMIT 100;
      `
    );

    return NextResponse.json(result.rows, { status: 200 });
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
