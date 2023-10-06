import { PetRepository } from '@/repositories/pet-repository'

export class FindPetUseCase {
  constructor(private readonly repository: PetRepository) {}

  async execute(id: string) {
    const pet = await this.repository.findById(id)
    return { pet }
  }
}
