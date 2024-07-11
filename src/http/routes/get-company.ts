import Elysia from 'elysia'

import { db } from '../../db/connection'
import { auth } from '../auth'

export const getManagedCompany = new Elysia()
  .use(auth)
  .get('/managed-company', async ({ getCurrentUser }) => {
    const { companyId } = await getCurrentUser()

    if (!companyId) {
      throw new Error('User is not a manager.')
    }

    const managedCompany = await db.query.companies.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, companyId)
      },
    })

    if (!managedCompany) {
      throw new Error('Company not found.')
    }

    return managedCompany
  })
