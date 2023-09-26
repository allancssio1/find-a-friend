import { ORG } from '@/entities/org-entity'
import { OrgRepository } from '../org-repository'
import { randomUUID } from 'crypto'

export class OrgRepositoryInMemory implements OrgRepository {
  public items: ORG[] = []

  async create(data: ORG): Promise<ORG> {
    const org: ORG = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone_number: data.phone_number,
      name_responsible: data.name_responsible,
      street: data.street,
      city: data.city,
      district: data.district,
      state: data.state,
      address_number: data.address_number,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findById(id: string): Promise<ORG | null> {
    const org = this.items.find((item) => item.id === id)

    return org ?? null
  }

  async findByEmail(email: string): Promise<ORG | null> {
    const org = this.items.find((item) => item.email === email)

    return org ?? null
  }

  async findManyByName(query: string, page: number): Promise<ORG[]> {
    const orgs = this.items
      .filter((item) => item.name?.includes(query))
      .splice((page - 1) * 10, page * 10)

    return orgs
  }
}
