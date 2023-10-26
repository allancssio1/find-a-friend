import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findPetAvailable(city: string, page: number): Promise<Pet[]>
  filterPetsByCaracterie(query: string, page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
