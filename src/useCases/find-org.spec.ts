import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { FindOrgsUseCase } from './find-org'

let reporitory: OrgRepositoryInMemory
let findOrgsUseCase: FindOrgsUseCase
describe('Find ORG', () => {
  beforeEach(() => {
    reporitory = new OrgRepositoryInMemory()
    findOrgsUseCase = new FindOrgsUseCase(reporitory)
  })
  afterEach(() => {})
  it('Should be to find Org by id', async () => {
    const orgCreated = await reporitory.create({
      name: `Org-name-1`,
      email: `org.email1@email.com`,
      password_hash: '123456',
      address_number: `100`,
      city: `Maracanaú`,
      district: `Timbó`,
      name_responsible: `responsavel-name-1`,
      phone_number: '85999999999',
      state: `Ceará`,
      street: `Rua 111`,
    })

    await reporitory.create({
      name: `Org-name-2`,
      email: `org.email2@email.com`,
      password_hash: '123456',
      address_number: `100`,
      city: `Maracanaú`,
      district: `Timbó`,
      name_responsible: `responsavel-name-2`,
      phone_number: '85999999999',
      state: `Ceará`,
      street: `Rua 112s`,
    })

    const { org } = await findOrgsUseCase.execute(String(orgCreated.id))

    expect(org?.id).toEqual(orgCreated.id)
  })
})
