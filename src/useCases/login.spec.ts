import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { LoginUseCase } from './login'
import { LoginError } from '@/errors/login-errors'
import { CompareHash } from '@/utils/compare-hash'
import { ComparePassword } from '@/contract/password'

let reporitory: OrgRepositoryInMemory
let loginUseCase: LoginUseCase
let compareHash: ComparePassword
describe('Login ORG', () => {
  beforeEach(async () => {
    reporitory = new OrgRepositoryInMemory()
    compareHash = new CompareHash()
    loginUseCase = new LoginUseCase(reporitory, compareHash)
  })
  afterEach(() => {})
  it('Should be to login org', async () => {
    await reporitory.create({
      name: 'teste',
      email: 'teste@teste.com',
      password_hash: '123456',
      city: 'Maracanaú',
      name_responsible: 'Teste',
      phone_number: '(85) 989353235',
    })

    const { org } = await loginUseCase.execute({
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should be able to login org with wrong email', async () => {
    await reporitory.create({
      name: 'teste',
      email: 'teste@teste.com',
      password_hash: '123456',
      city: 'Maracanaú',
      name_responsible: 'Teste',
      phone_number: '(85) 989353235',
    })

    expect(
      async () =>
        await loginUseCase.execute({
          email: 'org-login-test1@test.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(LoginError)
  })
  it('Should be able to login org with wrong password', async () => {
    await reporitory.create({
      name: 'teste',
      email: 'teste@teste.com',
      password_hash: '123456',
      city: 'Maracanaú',
      name_responsible: 'Teste',
      phone_number: '(85) 989353235',
    })

    expect(
      async () =>
        await loginUseCase.execute({
          email: 'org-login-test@test.com',
          password: '1234567',
        }),
    ).rejects.toBeInstanceOf(LoginError)
  })
})
