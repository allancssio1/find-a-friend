import { LoginError } from '@/errors/login-errors'
import { makeLoginUseCase } from '@/factories/makeLoginUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = loginSchema.parse(request.body)

  try {
    const { org } = await makeLoginUseCase().execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sub: org.id,
    })

    const refreshToken = await reply.jwtSign({
      sub: org.id,
      expiresIn: '7d', // o refreshToken expira em 7 dias, ai ele precisa fazer login
    })
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // so vai aceitar requests de https
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    console.log('🚀 ~ file: Login.ts:40 ~ login ~ error:', error)
    if (error instanceof LoginError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
