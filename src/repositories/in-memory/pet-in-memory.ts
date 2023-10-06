import { Pet } from '@/entities/pet-entity'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'
import { Images } from '@/entities/images-entity'
import { OrgRepository } from '../org-repository'

export class PetRepositoryInMemory implements PetRepository {
  public pets: Pet[] = []
  public images: Images[] = []

  constructor(private orgRepository: OrgRepository) {}

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
}
