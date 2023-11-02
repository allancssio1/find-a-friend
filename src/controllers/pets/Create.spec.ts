import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
describe('Create Org', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should bi able to create org', async () => {
    const responseOrg = await request(app.server).post('/orgs').send({
      name: 'Org-name',
      email: 'org.email@email.com',
      password: '123456',
      city: 'Maracanaú',
      name_responsible: 'responsavel-name',
      phone_number: '85999999999',
    })

    const response = await request(app.server).post('/pet').send({
      name: 'doguinho',
      about: 'doguinho bonitinho',
      available: true,
      year_old: '3 anos',
      orgId: responseOrg.body.id,
    })

    expect(response.statusCode).toEqual(201)
  })
})
