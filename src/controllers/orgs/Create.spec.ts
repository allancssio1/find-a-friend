import { app } from '@/app'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
describe('Create Org', () => {
  beforeEach(async () => {
    await app.ready()
  })
  afterEach(async () => {
    await app.close()
  })
  it('Should bi able to create org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org-name',
      email: 'org.email@email.com',
      password: '123456',
      city: 'Maracanaú',
      name_responsible: 'responsavel-name',
      phone_number: '85999999999',
    })

    expect(response.statusCode).toEqual(201)
  })
})
