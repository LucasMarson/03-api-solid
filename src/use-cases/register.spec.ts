import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
    })

    const isPasswordCurrentlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCurrentlyHashed).toBe(true)
  })

  it('should not be able to regster with same email twice', async () => {
    const email = 'test@test.com'

    await sut.execute({
      name: 'test',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'test',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
