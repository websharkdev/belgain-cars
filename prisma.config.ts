import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'prisma/config';

const envPath = resolve(process.cwd(), '.env');

if (existsSync(envPath)) {
  process.loadEnvFile?.(envPath);
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Placeholder for `prisma generate` when .env is missing (no DB connection required).
    url:
      process.env.DATABASE_URL ??
      'postgresql://localhost:5432/postgres?schema=public',
  },
});
