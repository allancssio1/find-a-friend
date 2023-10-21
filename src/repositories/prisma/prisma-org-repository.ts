import { OrgRepository } from '../org-repository'
import { Org } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Org): Promise<Org> {
    const org = await prisma.org.create({ data })
    return org ?? null
  }

  findById(id: string): Promise<Org | null> {
    throw new Error('Method not implemented.')
  }

  findByCity(city: string): Promise<Org[]> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { email } })
    return org
  }

  findManyByName(query: string, page: number): Promise<Org[]> {
    throw new Error('Method not implemented.')
  }
}
