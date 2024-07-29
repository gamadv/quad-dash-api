import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'

import { db } from '../../db/connection'
import { companies } from '../../db/schema'
import { auth } from '../auth'

export const updateProfile = new Elysia().use(auth).put(
  '/profile',
  async ({ getManagedCompanyId, set, body }) => {
    const companyId = await getManagedCompanyId()
    const { name, description } = body

    await db
      .update(companies)
      .set({
        name,
        description,
      })
      .where(eq(companies.id, companyId))

    set.status = 204
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
  },
)
