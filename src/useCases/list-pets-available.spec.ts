import { PetRepositoryInMemory } from '@/repositories/in-memory/pet-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ListPetAvailableUseCase } from './list-pets-available'
import { hash } from 'bcryptjs'
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
  it('Should be to find many ORGs with name in filter', async () => {
    for (let index = 0; index <= 2; index++) {
      const org = await orgRepository.create({
        name: `Org-name-${index}`,
        email: `org.email${index}@email.com`,
        password_hash: String(hash('123456', 6)),
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
        })
      }
    }

    const { pets } = await listPetsAvailableUseCase.execute('Maracanau-2', 1)

    expect(pets).toHaveLength(3)
  })

  // it('Should be to find many ORGs with pagination', async () => {
  //   for (let index = 1; index <= 11; index++) {
  //     await reporitory.create({
  //       name: `Org-name-${index}`,
  //       email: `org.email${index}@email.com`,
  //       password_hash: String(hash('123456', 6)),
  //       address_number: `100`,
  //       city: `Maracanaú`,
  //       district: `Timbó`,
  //       name_responsible: `responsavel-name-${index}`,
  //       phone_number: '85999999999',
  //       state: `Ceará`,
  //       street: `Rua 11${index}`,
  //     })
  //   }

  //   const { orgs } = await listPetsAvailableUseCase.execute('Org-name', 2)

  //   expect(orgs.length).toEqual(1)
  //   expect(orgs).toEqual([
  //     expect.objectContaining({
  //       name: 'Org-name-11',
  //     }),
  //   ])
  // })
})