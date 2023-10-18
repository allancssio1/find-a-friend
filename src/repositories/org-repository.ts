import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByCity(city: string): Promise<Org[]>
  findByEmail(email: string): Promise<Org | null>
  findManyByName(query: string, page: number): Promise<Org[]>
}
