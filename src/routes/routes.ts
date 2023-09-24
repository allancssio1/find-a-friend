import { FastifyInstance } from 'fastify'

export const routes = async (app: FastifyInstance) => {
  app.get('/', (_, reply) => {
    return reply.status(201).send('acertou miserave')
  })
}
