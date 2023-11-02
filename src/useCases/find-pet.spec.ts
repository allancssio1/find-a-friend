import { PetRepositoryInMemory } from '@/repositories/in-memory/pet-in-memory'
import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { FindPetUseCase } from './find-pet'

let reporitory: PetRepositoryInMemory
let orgReporitory: OrgRepositoryInMemory
let findPetByIdUseCase: FindPetUseCase
describe('Find Pet', () => {
  beforeEach(() => {
    orgReporitory = new OrgRepositoryInMemory()
    reporitory = new PetRepositoryInMemory(orgReporitory)
    findPetByIdUseCase = new FindPetUseCase(reporitory)
  })
  afterEach(() => {})
  it('Should be to find Org by id', async () => {
    const org = await orgReporitory.create({
      name: 'Org-name',
      email: 'org.email@email.com',
      password_hash: '123456',
      address_number: '100',
      city: 'Maracanaú',
      district: 'Timbó',
      name_responsible: 'responsavel-name',
      phone_number: '85999999999',
      state: 'Ceará',
      street: 'Rua 118',
    })

    const petCreated = await reporitory.create({
      name: 'doguinho',
      orgId: String(org.id),
      about: 'doguinho no foguete',
      year_old: '3 meses',
    })

    const { pet } = await findPetByIdUseCase.execute(String(petCreated.id))
    expect(pet?.id).toEqual(expect.any(String))
    expect(pet?.orgId).toEqual(org.id)
  })
})
