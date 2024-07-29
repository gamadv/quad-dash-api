import { createId } from '@paralleldrive/cuid2'
import Elysia, { t } from 'elysia'

// import nodemailer from 'nodemailer'
import { db } from '../../db/connection'
import { authLinks } from '../../db/schema'
import { env } from '../../env'
// import { mail } from '../../lib/mail'

export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    const userFromEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!userFromEmail) {
      throw new Error('User not found')
    }

    const authLinkCode = createId()

    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    // Enviar um e-mail
    // const info = await mail.sendMail({
    //   from: {
    //     name: 'Quad Dash',
    //     address: 'auth@quaddash.com',
    //   },
    //   to: email,
    //   html: `
    //     <div>
    //       <p>Use the following link to authenticate on Quad Dash:
    //         <a rel="noreferrer" target="_blank" href="${authLink.toString()}">
    //           ${authLink.toString()}
    //         </a>
    //       </p>
    //     </div>
    //   `,
    //   subject: 'Authenticate to Quad Dash',
    //   text: `Use the following link to authenticate on Quad Dash: ${authLink.toString()}`,
    // })

    console.info('📨', authLink.href)
  },

  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
