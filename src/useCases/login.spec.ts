import { OrgRepositoryInMemory } from '@/repositories/in-memory/org-in-memory'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { LoginUseCase } from './login'
import { hash } from 'bcryptjs'
import { LoginError } from '@/errors/login-errors'

let reporitory: OrgRepositoryInMemory
let loginUseCase: LoginUseCase
describe('Login ORG', () => {
  beforeEach(() => {
    reporitory = new OrgRepositoryInMemory()
    loginUseCase = new LoginUseCase(reporitory)
  })
  afterEach(() => {})
  it('Should be to login org', async () => {
    await reporitory.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    })

    const { org } = await loginUseCase.execute({
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should be able to login org with wrong email', async () => {
    await reporitory.create({
      email: 'org-login-test@test.com',
      password_hash: (await hash('123456', 6)).toString(),
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
      email: 'org-login-test@test.com',
      password_hash: (await hash('123456', 6)).toString(),
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
