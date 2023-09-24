import { fastify } from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { routes } from './routes/routes'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error.message)
  } else {
    // TODO: Here i should log to an extenal tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
