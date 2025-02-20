import Elysia, { t } from 'elysia'

import { db } from '../../db/connection'
import { auth } from '../auth'
import { NotAManagerError } from '../errors/not-a-manager-error'

export const getOrderDetails = new Elysia().use(auth).get(
  '/orders/:orderId',
  async ({ getCurrentUser, params, set }) => {
    const { orderId } = params
    const { companyId } = await getCurrentUser()

    if (!companyId) {
      throw new NotAManagerError()
    }

    const order = await db.query.orders.findFirst({
      columns: {
        id: true,
        status: true,
        totalInCents: true,
        createdAt: true,
      },
      with: {
        customer: {
          columns: {
            name: true,
            phone: true,
            email: true,
          },
        },
        orderItems: {
          columns: {
            id: true,
            priceInCents: true,
            quantity: true,
          },
          with: {
            product: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
      where(fields, { eq, and }) {
        return and(eq(fields.id, orderId), eq(fields.companyId, companyId))
      },
    })

    if (!order) {
      set.status = 400

      return { message: 'Order not found.' }
    }

    return order
  },
  {
    params: t.Object({
      orderId: t.String(),
    }),
  },
)
