import { ChckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<ChckIn | null>
  findManyByUserId(userId: string, page: number): Promise<ChckIn[]>
  create(data: Prisma.ChckInUncheckedCreateInput): Promise<ChckIn>
}
