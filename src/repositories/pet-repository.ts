import { Pet } from '@/entities/pet-entity'

export interface PetRepository {
  create(data: Pet): Promise<Pet>
}
