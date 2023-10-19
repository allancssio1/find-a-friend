import { makeCreateOrgUseCase } from '@/useCases/factories/makeCreateOrgUseCase'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrg(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email({ message: 'This email is correct?' }),
    password: z
      .string()
      .min(6, { message: 'Password lenght min 6 caracterie.' }),
    phone_number: z
      .string()
      .refine((value) => value ?? 'Phone number is mandatory.'),
    name_responsible: z
      .string()
      .refine((value) => value ?? 'Name reponsible is mandatory.'),
    city: z.string().refine((value) => value ?? 'City is mandatory.'),
    street: z.string().nullable(),
    district: z.string().nullable(),
    state: z.string().nullable(),
    address_number: z.string().nullable(),
  })

  const {
    name,
    email,
    name_responsible,
    password,
    phone_number,
    city,
    address_number,
    district,
    state,
    street,
  } = createBodySchema.parse(req.body)

  const password_hash = await hash(password, 6)

  const createOrgUseCase = makeCreateOrgUseCase()

  const { org } = await createOrgUseCase.execute({
    name,
    email,
    name_responsible,
    password_hash,
    phone_number,
    city,
    address_number,
    district,
    state,
    street,
  })
  return reply.status(201).send({ ...org, password_hash: null })
}
