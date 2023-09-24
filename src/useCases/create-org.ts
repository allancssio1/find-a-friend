import { ORG } from '@/entities/org-entity'
import { OrgRepository } from '@/repositories/org-repository'

export class CreateOrgUseCase {
  constructor(private readonly repository: OrgRepository) {}
  async execute(data: ORG) {
    const org = await this.repository.create(data)

    return { org }
  }
}
