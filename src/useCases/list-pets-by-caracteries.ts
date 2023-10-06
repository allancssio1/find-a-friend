import { PetRepository } from '@/repositories/pet-repository'

export class ListPetByCaracterieUseCase {
  constructor(private readonly repository: PetRepository) {}

  async execute(query: string, page: number) {
    const pets = await this.repository.filterPetsByCaracterie(query, page)

    return { pets }
  }
}
