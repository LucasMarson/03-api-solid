import { FastifyInstance } from 'fastify'
import { resgiter } from './controllers/register.controllers'
import { authenticate } from './controllers/authenticate.controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', resgiter)

  app.post('/sessions', authenticate)
}
