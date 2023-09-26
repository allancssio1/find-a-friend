import { ORG } from '@/entities/org-entity'

export interface OrgRepository {
  create(data: ORG): Promise<ORG>
  findById(id: string): Promise<ORG | null>
  findByEmail(email: string): Promise<ORG | null>
  findManyByName(query: string, page: number): Promise<ORG[]>
}
