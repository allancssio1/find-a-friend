import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FindPetUseCase } from '@/useCases/find-pet'

export function makeFindPetUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const repository = new PrismaPetRepository(orgRepository)
  const findPetUseCase = new FindPetUseCase(repository)
  return findPetUseCase
}
