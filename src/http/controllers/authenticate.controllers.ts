import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidateCredentialsError } from '@/use-cases/errors/invalid-credencial-error'
import { makeAutheticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBoduSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBoduSchema.parse(request.body)

  try {
    const authenticateUseCase = makeAutheticateUseCase()

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidateCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
