import { PetRepository } from '@/repositories/pet-repository'
import { Prisma } from '@prisma/client'

export class CreatePetUseCase {
  constructor(private readonly repository: PetRepository) {}
  async execute(data: Prisma.PetUncheckedCreateInput) {
    const pet = await this.repository.create(data)

    return { pet }
  }
}
