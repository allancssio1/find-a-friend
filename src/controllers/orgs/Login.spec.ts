import { app } from '@/app'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { LoginError } from '@/errors/login-errors'
describe('Login Org', () => {
  beforeEach(async () => {
    await app.ready()
  })
  afterEach(async () => {
    await app.close()
  })
  it('Should be able to make login', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org-name',
      email: 'org.email@email.com',
      password: '123456',
      city: 'Maracanaú',
      name_responsible: 'responsavel-name',
      phone_number: '85999999999',
    })

    const response = await request(app.server).post('/login').send({
      email: 'org.email@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('Should be not able to make login with email wrong', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org-name',
      email: 'org.email@email.com',
      password: '123456',
      city: 'Maracanaú',
      name_responsible: 'responsavel-name',
      phone_number: '85999999999',
    })

    const response = await request(app.server).post('/login').send({
      email: 'org.email.wrong@email.com',
      password: '123456',
    })
    console.log('🚀 ~ file: Login.spec.ts:47 ~ response ~ response:', response)

    expect(response.statusCode).toEqual(400)
  })
})
