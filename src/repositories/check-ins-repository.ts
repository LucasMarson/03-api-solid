import { ChckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.ChckInUncheckedCreateInput): Promise<ChckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<ChckIn | null>
}
