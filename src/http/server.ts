import { Elysia } from 'elysia'

import { registerCompany } from './routes/register-company'
import { sendAuthLink } from './routes/send-auth-link'

const mainApp = new Elysia().use(registerCompany).use(sendAuthLink)

mainApp.listen(3000, () => {
  console.info('🔥 HTTP server running!!')
})
