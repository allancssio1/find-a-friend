import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.org.create({
    data: {
      name: 'John Doe Org',
      email: 'johndow@exemple.com',
      password_hash: await hash('123456', 6),
      city: 'City Here',
      name_responsible: 'John Doe Org',
      phone_number: '(99) 9999-9999',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/login').send({
    email: 'johndow@exemple.com',
    password: '123456',
  })

  const { token } = authResponse.body
  return { token }
}
