import jwt from '@elysiajs/jwt'
import { Elysia, type Static, t } from 'elysia'

import { env } from '../env'
import { NotAManagerError } from './errors/not-a-manager-error'
import { UnauthorizedError } from './errors/unauthorized-error'

const jwtPayload = t.Object({
  sub: t.String(),
  companyId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
    NOT_A_MANAGER: NotAManagerError,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'UNAUTHORIZED':
        set.status = 401
        return { code, message: error.message }
      case 'NOT_A_MANAGER':
        set.status = 401
        return { code, message: error.message }
    }
  })
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .derive({ as: 'scoped' }, ({ jwt, cookie: { auth }, set }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        auth.set({
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
          value: token,
        })
      },

      signOut: () => {
        auth.remove()
      },

      getCurrentUser: async () => {
        const payload = await jwt.verify(auth.value)

        if (!payload) {
          set.status = 401
          throw new Error('Unauthorized')
        }

        return {
          userId: payload.sub,
          companyId: payload.companyId,
        }
      },
    }
  })
  .derive({ as: 'scoped' }, ({ getCurrentUser }) => {
    return {
      getManagedCompanyId: async () => {
        const { companyId } = await getCurrentUser()

        if (!companyId) {
          throw new NotAManagerError()
        }

        return companyId
      },
    }
  })
