import { PetRepositoryInMemory } from '@/repositories/in-memory/pet-in-memory'
import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { FindPetUseCase } from './find-pet'
import { randomUUID } from 'crypto'

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
    const petCreated = await reporitory.create({
      name: 'doguinho',
      orgId: randomUUID(),
    })

    const { pet } = await findPetByIdUseCase.execute(String(petCreated.id))
    expect(pet?.id).toEqual(expect.any(String))
  })
})
