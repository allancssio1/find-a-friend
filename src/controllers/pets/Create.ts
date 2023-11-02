// import { makeCreateOrgUseCase } from '@/useCases/factories/makeCreateOrgUseCase'
// import { hash } from 'bcryptjs'
import { makeCreatePetUseCase } from '@/factories/makeCreatePetUseCase'
import { makeFindOrgUseCase } from '@/factories/makeFindOrgUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z
      .string()
      .refine((value) => value ?? null, { message: 'Pet name is required.' }),
    about: z
      .string()
      .refine((value) => value ?? null, { message: 'Pet about is required.' }),
    year_old: z.string().refine((value) => value ?? null, {
      message: 'Pet years old is required.',
    }),
    available: z.string().refine((value) => value ?? null, {
      message: 'Available is required with "true" or "false".',
    }),
    orgId: z
      .string()
      .refine((value) => value ?? null, { message: 'Org id is required.' }),
    images: z.array(z.object({})).optional(),
  })

  const { name, about, available, year_old, orgId } = createBodySchema.parse(
    req.body,
  )

  const availableTemp = available === 'true' ?? false
  const findOrgUseCase = makeFindOrgUseCase()
  const { org } = await findOrgUseCase.execute(orgId)

  if (!org) return reply.status(404).send({ message: 'Org not found!' })

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    name,
    about,
    year_old,
    available: availableTemp,
    orgId,
  })
  return reply.status(201).send(pet)
}
