import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { LoginUseCase } from '../useCases/login'
import { CompareHashProduction } from '@/utils/compareHash/compare-production'

export function makeLoginUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const loginUseCase = new LoginUseCase(
    orgRepository,
    new CompareHashProduction(),
  )

  return loginUseCase
}
