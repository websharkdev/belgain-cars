import { defineConfig } from 'prisma/config';

process.loadEnvFile?.();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Placeholder for `prisma generate` when .env is missing (no DB connection required).
    url:
      process.env.DATABASE_URL ??
      'postgresql://localhost:5432/postgres?schema=public',
  },
});
