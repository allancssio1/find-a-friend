import { FastifyInstance } from 'fastify'
import { CreateOrg } from '@/controllers/orgs/Create'

export const orgRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', new CreateOrg().execute)
}
