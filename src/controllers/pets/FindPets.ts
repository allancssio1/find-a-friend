import { makeFindPetUseCase } from '@/factories/makeFindPetUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findPets(req: FastifyRequest, replay: FastifyReply) {
  const paramsSchema = z.strictObject({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(req.params)

  const findPetUseCase = makeFindPetUseCase()
  const { pet } = await findPetUseCase.execute(id)
  return replay.status(200).send(pet)
}
