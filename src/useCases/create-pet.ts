import { Pet } from '@/entities/pet-entity'
import { PetRepository } from '@/repositories/pet-repository'

export class CreatePetUseCase {
  constructor(private readonly repository: PetRepository) {}
  async execute(data: Pet) {
    const pet = await this.repository.create(data)

    return { pet }
  }
}
