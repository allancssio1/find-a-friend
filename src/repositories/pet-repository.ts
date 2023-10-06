import { Pet } from '@/entities/pet-entity'

export interface PetRepository {
  create(data: Pet): Promise<Pet>
  findPetAvailable(city: string, page: number): Promise<Pet[]>
  filterPetsByCaracterie(query: string, page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
