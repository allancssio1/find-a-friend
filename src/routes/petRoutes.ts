import { createPet } from '@/controllers/pets/Create'
import { FastifyInstance } from 'fastify'

export const petRoutes = async (app: FastifyInstance) => {
  app.post('/pets', createPet)
}
