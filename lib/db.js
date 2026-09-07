import { neon } from '@neondatabase/serverless';

// This automatically uses the DATABASE_URL from your .env.local file
export const sql = neon(process.env.DATABASE_URL);