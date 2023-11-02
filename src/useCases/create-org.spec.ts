import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { maskPhone } from '@/utils/masks'

let reporitory: OrgRepositoryInMemory
let createUseCase: CreateOrgUseCase
describe('Create ORG', () => {
  beforeEach(() => {
    reporitory = new OrgRepositoryInMemory()
    createUseCase = new CreateOrgUseCase(reporitory)
  })
  afterEach(() => {})
  it('Should be to create a ORG', async () => {
    const { org } = await createUseCase.execute({
      name: 'Org-name',
      email: 'org.email@email.com',
      password_hash: '123456',
      address_number: '100',
      city: 'Maracanaú',
      district: 'Timbó',
      name_responsible: 'responsavel-name',
      phone_number: maskPhone('85999999999'),
      state: 'Ceará',
      street: 'Rua 118',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
