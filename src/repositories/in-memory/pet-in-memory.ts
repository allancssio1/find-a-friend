import { Pet } from '@/entities/pet-entity'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'
import { Images } from '@/entities/images-entity'
import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'

export class PetRepositoryInMemory implements PetRepository {
  public pets: Pet[] = []
  public images: Images[] = []
  private orgRepository = new OrgRepositoryInMemory()

  async create(data: Pet): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      orgId: data.orgId,
      available: String(data.available) !== 'false',
      year_old: '2 anos',
      created_at: new Date(),
    }

    if (data.images && data.images.length > 0) {
      await data.images.forEach((item) => {
        const image = {
          id: randomUUID(),
          image: item.image ?? '',
          petId: pet.id,
        }
        this.images.push(image)
      })
    }

    if (this.images.length > 0) {
      pet.images = this.images
    }

    await this.pets.push(pet)

    return pet
  }

  async findPetAvailable(city: string, page: number): Promise<Pet[]> {
    const orgsList = await this.orgRepository.findByCity(city)

    let petsFiltred: Pet[] = []

    if (orgsList.length <= 0) {
      return []
    }

    orgsList.forEach((org) => {
      const pets: Pet[] = this.pets
        .filter((pet) => pet.orgId === org.id)
        .splice((page - 1) * 10, page * 10)
      if (pets.length > 0) {
        petsFiltred = petsFiltred.concat(pets)
      }
    })

    return petsFiltred
  }
}
