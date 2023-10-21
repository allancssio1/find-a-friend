import { fastify } from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { orgRoutes } from './routes/orgRoutes'
import { petRoutes } from './routes/petRoutes'
import multipart from '@fastify/multipart'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)

app.register(multipart)
app.register(orgRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: error.message,
    })
  }
  console.log(error)
  if (env.NODE_ENV !== 'production') {
    console.log(error.message)
  } else {
    // TODO: Here i should log to an extenal tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
