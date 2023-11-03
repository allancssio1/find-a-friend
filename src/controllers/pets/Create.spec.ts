import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/createAnAuthenticateOrg'
import { prisma } from '@/lib/prisma'
describe('Create Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should bi able to create org', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const org = await prisma.org.findFirstOrThrow()

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'doguinho',
        about: 'doguinho bonitinho',
        available: 'true',
        year_old: '3 anos',
        orgId: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
