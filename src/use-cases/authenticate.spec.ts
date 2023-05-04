import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidateCredentialsError } from './errors/invalid-credencial-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Autenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to autenticate', async () => {
    // Estamos criando o usario no banco inMoemory para podermos conseguir fazer o teste
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'test@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'test@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to autenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidateCredentialsError)
  })

  it('should not be able to autenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'test@test.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidateCredentialsError)
  })
})
