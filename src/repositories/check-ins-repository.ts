import { ChckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<ChckIn | null>
  findManyByUserId(userId: string, page: number): Promise<ChckIn[]>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.ChckInUncheckedCreateInput): Promise<ChckIn>
}
