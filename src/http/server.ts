import { Elysia } from 'elysia'

import { authenticateFromLink } from './routes/authenticate-from-link'
import { getManagedCompany } from './routes/get-company'
import { getProfile } from './routes/get-profile'
import { registerCompany } from './routes/register-company'
import { sendAuthLink } from './routes/send-auth-link'
import { signOut } from './routes/sign-out'

const mainApp = new Elysia()
  .use(registerCompany)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedCompany)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
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
