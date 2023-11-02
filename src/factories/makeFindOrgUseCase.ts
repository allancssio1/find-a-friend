import { FindOrgsUseCase } from '../useCases/find-org'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'

export function makeFindOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const findOrgUseCase = new FindOrgsUseCase(orgRepository)
  return findOrgUseCase
}
