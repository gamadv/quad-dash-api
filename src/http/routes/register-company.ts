import { Elysia, t } from 'elysia'

import { db } from '../../db/connection'
import { companies, users } from '../../db/schema'

export const registerCompany = new Elysia().post(
  '/company',
  async ({ body, set }) => {
    const { companyName, managerName, email, phone } = body

    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        phone,
        role: 'manager',
      })
      .returning({
        id: users.id,
      })

    await db.insert(companies).values({
      name: companyName,
      managerId: manager.id,
    })

    set.status = 204
  },
  {
    body: t.Object({
      companyName: t.String(),
      managerName: t.String(),
      phone: t.String(),
      email: t.String({ format: 'email' }),
    }),
  },
)
