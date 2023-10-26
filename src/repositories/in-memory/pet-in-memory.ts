import { PetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'
import { OrgRepository } from '../org-repository'
import { Pet, Prisma } from '@prisma/client'

export class PetRepositoryInMemory implements PetRepository {
  public pets: Pet[] = []

  constructor(private orgRepository: OrgRepository) {}

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about ?? null,
      orgId: String(data.org_id),
      available: String(data.available) !== 'false',
      year_old: '2 anos',
      created_at: new Date(),
    }

    await this.pets.push(pet)

    return pet
  }

  async findPetAvailable(city: string, page: number): Promise<Pet[]> {
    const orgs = await this.orgRepository.findByCity(city)

    const petsFounded: Pet[] = []

    await orgs.forEach((org) => {
      this.pets.forEach((pet) => {
        if (pet.orgId === org.id && pet.available === true) {
          petsFounded.push(pet)
        }
      })
    })

    return petsFounded.splice((page - 1) * 10, page * 10) || []
  }

  async filterPetsByCaracterie(query: string, page: number): Promise<Pet[]> {
    const petsFounded = await this.pets
      .filter((pet) =>
        pet.about?.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
      .splice((page - 1) * 10, page * 10)

    return petsFounded || []
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    return pet || null
  }
}
