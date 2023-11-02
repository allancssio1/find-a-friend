import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ListOrgsUseCase } from './list-orgs'

let reporitory: OrgRepositoryInMemory
let listOrgsUseCase: ListOrgsUseCase
describe('List ORG', () => {
  beforeEach(() => {
    reporitory = new OrgRepositoryInMemory()
    listOrgsUseCase = new ListOrgsUseCase(reporitory)
  })
  afterEach(() => {})
  it('Should be to find many ORGs with name in filter', async () => {
    for (let index = 1; index <= 3; index++) {
      await reporitory.create({
        name: `Org-name-${index}`,
        email: `org.email${index}@email.com`,
        password_hash: '123456',
        address_number: `100`,
        city: `Maracanaú`,
        district: `Timbó`,
        name_responsible: `responsavel-name-${index}`,
        phone_number: '85999999999',
        state: `Ceará`,
        street: `Rua 11${index}`,
      })
    }

    const { orgs } = await listOrgsUseCase.execute('Org-name-1', 1)

    expect(orgs).toEqual([
      expect.objectContaining({
        name: `Org-name-1`,
        email: `org.email1@email.com`,
      }),
    ])
  })

  it('Should be to find many ORGs with pagination', async () => {
    for (let index = 0; index <= 10; index++) {
      await reporitory.create({
        name: `Org-name-${index}`,
        email: `org.email${index}@email.com`,
        password_hash: '123456',
        address_number: `100`,
        city: `Maracanaú`,
        district: `Timbó`,
        name_responsible: `responsavel-name-${index}`,
        phone_number: '85999999999',
        state: `Ceará`,
        street: `Rua 11${index}`,
      })
    }

    const { orgs } = await listOrgsUseCase.execute('Org-name', 2)

    expect(orgs.length).toEqual(1)
    expect(orgs).toEqual([
      expect.objectContaining({
        name: 'Org-name-10',
      }),
    ])
  })
})
