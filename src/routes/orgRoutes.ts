import { FastifyInstance } from 'fastify'
import { createOrg } from '@/controllers/orgs/Create'
import { login } from '@/controllers/orgs/Login'

export const orgRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', createOrg)

  app.post('/login', login)
}
