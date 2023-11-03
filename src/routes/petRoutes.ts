import { verifyJWT } from '@/auth/verifyJWT'
import { createPet } from '@/controllers/pets/Create'
import { findPets } from '@/controllers/pets/FindPets'
import { FastifyInstance } from 'fastify'

export const petRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  app.post('/pets', createPet)
  app.get('/pets/:id', findPets)
}
