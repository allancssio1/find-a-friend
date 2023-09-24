import { OrgRepository } from '@/repositories/org-repository'

export class FindOrgsUseCase {
  constructor(private readonly repository: OrgRepository) {}

  async execute(id: string) {
    const org = await this.repository.findById(id)
    return { org }
  }
}
