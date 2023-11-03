import { verifyJWT } from '@/auth/verifyJWT'
import { createPet } from '@/controllers/pets/Create'
import { FastifyInstance } from 'fastify'

export const petRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  app.post('/pets', createPet)
}
