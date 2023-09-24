import { OrgRepository } from '@/repositories/org-repository'

export class ListOrgsUseCase {
  constructor(private readonly repository: OrgRepository) {}

  async execute(query: string, page: number) {
    const orgs = await this.repository.findManyByName(query, page)
    return { orgs }
  }
}
