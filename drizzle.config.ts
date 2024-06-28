import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://docker:docker@localhost:5432/quad_dash',
  },
} satisfies Config
