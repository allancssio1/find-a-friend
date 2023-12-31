import { OrgRepository } from '@/repositories/org-repository'
import { Prisma } from '@prisma/client'

export class CreateOrgUseCase {
  constructor(private readonly repository: OrgRepository) {}
  async execute(data: Prisma.OrgCreateInput) {
    const org = await this.repository.create(data)

    return { org }
  }
}
