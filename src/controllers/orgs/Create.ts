import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateOrg {
  execute(req: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      phone_number: z.string(),
      name_responsible: z.string(),
      city: z.string(),
    })

    const { name, email, name_responsible, password, phone_number, city } =
      createBodySchema.parse(req.body)
    return reply.status(201).send({ createBodySchema })
  }
}
