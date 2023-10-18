import { FastifyInstance } from 'fastify'
import { CreateOrg } from '@/controllers/orgs/Create'
import { Login } from '@/controllers/orgs/Login'

export const orgRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', new CreateOrg().execute)
  app.post('/login', new Login().execute)
}
