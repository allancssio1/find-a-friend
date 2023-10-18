import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { LoginUseCase } from '../login'
import { CompareHash } from '@/utils/compare-hash'

export function makeLoginUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const loginUseCase = new LoginUseCase(orgRepository, new CompareHash())

  return loginUseCase
}
