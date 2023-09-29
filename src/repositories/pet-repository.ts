import { Pet } from '@/entities/pet-entity'

export interface PetRepository {
  create(data: Pet): Promise<Pet>
  findPetAvailable(city: string, page: number): Promise<Pet[]>
}
