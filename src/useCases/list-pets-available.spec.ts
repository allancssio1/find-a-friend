import { PetRepositoryInMemory } from '@/repositories/in-memory/pet-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ListPetAvailableUseCase } from './list-pets-available'
import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'

let reporitory: PetRepositoryInMemory
let listPetsAvailableUseCase: ListPetAvailableUseCase
let orgRepository: OrgRepositoryInMemory
describe('List Pets', () => {
  beforeEach(() => {
    orgRepository = new OrgRepositoryInMemory()
    reporitory = new PetRepositoryInMemory(orgRepository)
    listPetsAvailableUseCase = new ListPetAvailableUseCase(reporitory)
  })
  afterEach(() => {})
  it('Should be to list pets available', async () => {
    for (let index = 0; index <= 2; index++) {
      const org = await orgRepository.create({
        name: `Org-name-${index}`,
        email: `org.email${index}@email.com`,
        password_hash: '123456',
        address_number: `100`,
        city: `Maracanau-${index}`,
        district: `Timbó`,
        name_responsible: `responsavel-name-${index}`,
        phone_number: '85999999999',
        state: `Ceará`,
        street: `Rua 11${index}`,
      })

      for (let i = 0; i <= index; i++) {
        await reporitory.create({
          name: `Pet Name ${index}`,
          orgId: org.id?.toString(),
          year_old: '3 anos',
        })
      }
    }

    const { pets } = await listPetsAvailableUseCase.execute('Maracanau-2', 1)

    expect(pets).toHaveLength(3)
  })
})
