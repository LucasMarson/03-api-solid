import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInsUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberCheckInsError } from './errors/max-number-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInsUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInsUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Typescript Gym',
      description: '',
      phone: '',
      latitude: -22.7279184,
      longitude: -46.9023293,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7279184,
      userLongitude: -46.9023293,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day ', async () => {
    vi.setSystemTime(new Date(2022, 4, 22, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7279184,
      userLongitude: -46.9023293,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.7279184,
        userLongitude: -46.9023293,
      }),
    ).rejects.toBeInstanceOf(MaxNumberCheckInsError)
  })

  it('should be able to check in twice but in the different day ', async () => {
    vi.setSystemTime(new Date(2022, 4, 22, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7279184,
      userLongitude: -46.9023293,
    })

    vi.setSystemTime(new Date(2022, 4, 23, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.7279184,
      userLongitude: -46.9023293,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in on distance gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Typescript Gym',
      description: '',
      phone: '',
      longitude: new Decimal(-22.7036468),
      latitude: new Decimal(-46.9854747),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.7279184,
        userLongitude: -46.9023293,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
