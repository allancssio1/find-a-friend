import { PetRepositoryInMemory } from '@/repositories/in-memory/pet-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { hash } from 'bcryptjs'
import { maskPhone } from '@/utils/masks'

let reporitory: PetRepositoryInMemory
let createPetUseCase: CreatePetUseCase
let orgRepository: OrgRepositoryInMemory
describe('Create Pet', () => {
  beforeEach(() => {
    reporitory = new PetRepositoryInMemory()
    createPetUseCase = new CreatePetUseCase(reporitory)
    orgRepository = new OrgRepositoryInMemory()
  })
  afterEach(() => {})
  it('Should be to create a ORG', async () => {
    const org = await orgRepository.create({
      name: 'Org-name',
      email: 'org.email@email.com',
      password_hash: String(hash('123456', 6)),
      address_number: '100',
      city: 'Maracanaú',
      district: 'Timbó',
      name_responsible: 'responsavel-name',
      phone_number: maskPhone('85999999999'),
      state: 'Ceará',
      street: 'Rua 118',
    })

    const { pet } = await createPetUseCase.execute({
      name: 'Pet-name',
      about: 'Test about pet',
      orgId: org.id?.toString(),
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.orgId).toEqual(expect.any(String))
    expect(pet.available).toEqual(true)
  })
})
