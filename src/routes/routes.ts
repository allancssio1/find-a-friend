import { FastifyInstance } from 'fastify'

export const routes = async (app: FastifyInstance) => {
  app.get('/', (_, reply) => {
    return reply.status(201).send('acertou miserave')
  })
  app.post('/', (request, reply) => {
    const data = request.file()
    console.log('🚀 ~ file: routes.ts:9 ~ app.post ~ data:', data)
    return reply.send('true')
  })
}
