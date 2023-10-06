import { PetRepository } from '@/repositories/pet-repository'

export class ListPetAvailableUseCase {
  constructor(private readonly repository: PetRepository) {}

  async execute(city: string, page: number) {
    const pets = await this.repository.findPetAvailable(city, page)

    return { pets }
  }
}
