import cors from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { approveOrder } from './routes/approve-orders'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { cancelOrder } from './routes/cancel-orders'
import { deliverOrder } from './routes/deliver-order'
import { dispatchOrder } from './routes/dispatch-order'
import { getManagedCompany } from './routes/get-company'
import { getDailyReceiptInPeriod } from './routes/get-daily-receipts-by-period'
import { getDayOrdersAmount } from './routes/get-day-orders-amount'
import { getMonthCanceledOrdersAmount } from './routes/get-month-canceled-orders-amount'
import { getMonthOrdersAmount } from './routes/get-month-orders-amount'
import { getMonthReceipt } from './routes/get-month-receipt'
import { getOrderDetails } from './routes/get-order-details'
import { getOrders } from './routes/get-orders'
import { getPopularProducts } from './routes/get-popular-products'
import { getProfile } from './routes/get-profile'
import { registerCompany } from './routes/register-company'
import { sendAuthLink } from './routes/send-auth-link'
import { signOut } from './routes/sign-out'
import { updateProfile } from './routes/update-profile'

const mainApp = new Elysia()
  .use(cors())
  .use(registerCompany)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedCompany)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(cancelOrder)
  .use(deliverOrder)
  .use(dispatchOrder)
  .use(getOrders)
  .use(getMonthReceipt)
  .use(getDayOrdersAmount)
  .use(getMonthOrdersAmount)
  .use(getMonthCanceledOrdersAmount)
  .use(getPopularProducts)
  .use(getPopularProducts)
  .use(getDailyReceiptInPeriod)
  .use(updateProfile)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
      }
      case 'NOT_FOUND': {
        return new Response(null, { status: 404 })
      }
      default: {
        console.error('⚠️', error)

        return new Response(null, { status: 500 })
      }
    }
  })

mainApp.listen(3000, () => {
  console.info('🔥 HTTP server running!!')
})
