// import { makeCreateOrgUseCase } from '@/useCases/factories/makeCreateOrgUseCase'
// import { hash } from 'bcryptjs'
import { Pet } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema: Pet = z.object({
    name: z.string(),
  })

  // const {
  //   name,
  //   email,
  //   name_responsible,
  //   password,
  //   phone_number,
  //   city,
  //   address_number,
  //   district,
  //   state,
  //   street,
  // } = createBodySchema.parse(req.body)

  // const password_hash = await hash(password, 6)

  // const createOrgUseCase = makeCreateOrgUseCase()

  // const { org } = await createOrgUseCase.execute({
  //   name,
  //   email,
  //   name_responsible,
  //   password_hash,
  //   phone_number,
  //   city,
  //   address_number,
  //   district,
  //   state,
  //   street,
  // })
  // return reply.status(201).send({ ...org, password_hash: null })
  return reply.status(201).send()
}
