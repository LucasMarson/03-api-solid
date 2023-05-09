import { ChckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInHistoryUseCaseResquest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryUseCaseResponse {
  checkIns: ChckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseResquest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
