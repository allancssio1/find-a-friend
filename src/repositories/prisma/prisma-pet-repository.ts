import { prisma } from '@/lib/prisma'
import { PetRepository } from '../pet-repository'
import { Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'

export class PrismaPetRepository implements PetRepository {
  constructor(private readonly orgRepository: OrgRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findPetAvailable(city: string, page: number) {
    const pets = await prisma.org.findMany({
      where: { city },
      select: {
        Pet: {
          where: {
            available: true,
          },
        },
      },
    })
    console.log('🚀 ~  pets:', pets)

    // await orgs.forEach(async (org) => {
    //   const petsFounded = await prisma.pet.findMany({
    //     where: { orgId: org.id },
    //   })
    //   if (petsFounded) {
    //     pets = [...pets, ...petsFounded]
    //   }
    // })

    return []
  }

  async filterPetsByCaracterie(query: string, page: number) {
    return []
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })
    return pet
  }
}
