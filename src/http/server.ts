import { Elysia } from 'elysia'

import { authenticateFromLink } from './routes/authenticate-from-link'
import { registerCompany } from './routes/register-company'
import { sendAuthLink } from './routes/send-auth-link'

const mainApp = new Elysia()
  .use(registerCompany)
  .use(sendAuthLink)
  .use(authenticateFromLink)

mainApp.listen(3000, () => {
  console.info('🔥 HTTP server running!!')
})
