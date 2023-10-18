import { OrgRepository } from '../org-repository'
import { randomUUID } from 'crypto'
import { hash } from 'bcryptjs'
import { Org, Prisma } from '@prisma/client'

export class OrgRepositoryInMemory implements OrgRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: await hash(String(data.password_hash), 6),
      phone_number: String(data.phone_number).replace(/\D/g, ''),
      name_responsible: data.name_responsible,
      street: data.street ?? '',
      city: data.city,
      district: data.district ?? '',
      state: data.state ?? '',
      address_number: data.address_number ?? '',
      created_at: new Date(),
    }

    this.items.push(org)

    return { ...org }
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === id)

    return org ?? null
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email)

    return org ?? null
  }

  async findByCity(city: string): Promise<Org[]> {
    const orgsFiltred = await this.items.filter(
      (item) => item.city?.toLowerCase() === city.toLowerCase(),
    )

    return orgsFiltred ?? []
  }

  async findManyByName(query: string, page: number): Promise<Org[]> {
    const orgs = this.items
      .filter((item) => item.name?.includes(query))
      .splice((page - 1) * 10, page * 10)

    return orgs
  }
}
