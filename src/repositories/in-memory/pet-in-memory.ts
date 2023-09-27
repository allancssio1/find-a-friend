import { Pet } from '@/entities/pet-entity'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'
import { Images } from '@/entities/images-entity'

const pets: Pet[] = []
const images: Images[] = []

export class PetInMemory implements PetRepository {
  async create(data: Pet): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      orgId: data.orgId,
      disponible: String(data.disponible) !== 'false',
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
        images.push(image)
      })
    }

    if (images.length > 0) {
      pet.images = images
    }

    await pets.push(pet)

    return pet
  }
}
