import { PetRepositoryInMemory } from '@/repositories/in-memory/pet-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ListPetByCaracterieUseCase } from './list-pets-by-caracteries'
import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { randomUUID } from 'crypto'

let reporitory: PetRepositoryInMemory
let listPetsByCaracteriesUseCase: ListPetByCaracterieUseCase
let orgRepository: OrgRepositoryInMemory
describe('List Pets', () => {
  beforeEach(() => {
    orgRepository = new OrgRepositoryInMemory()
    reporitory = new PetRepositoryInMemory(orgRepository)
    listPetsByCaracteriesUseCase = new ListPetByCaracterieUseCase(reporitory)
  })
  afterEach(() => {})
  it('Should be to find many ORGs with name in filter', async () => {
    for (let index = 0; index <= 2; index++) {
      await reporitory.create({
        name: `Pet Name ${index}`,
        orgId: randomUUID(),
        about:
          index === 0
            ? `Picher rabo curto ${index + 2} meses`
            : index === 1
            ? `Doberman grandão colocador de medo ${index + 1}meses`
            : `Pé duro, comedor de lixo e destruidor de sapados ${
                index + 1
              } meses`,
      })
    }

    const { pets } = await listPetsByCaracteriesUseCase.execute('doberman', 1)

    expect(pets).toHaveLength(1)
  })
})
