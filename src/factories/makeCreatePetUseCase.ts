import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../useCases/create-pet'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'

export function makeCreatePetUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const petRepository = new PrismaPetRepository(orgRepository)
  const createPetUserCase = new CreatePetUseCase(petRepository)
  return createPetUserCase
}
