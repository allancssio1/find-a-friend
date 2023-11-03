import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/createAnAuthenticateOrg'
import { prisma } from '@/lib/prisma'
describe('Find Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should bi able to find pets', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const org = await prisma.org.findFirstOrThrow()
    let petId = ''
    for (let index = 0; index < 3; index++) {
      const pet = await prisma.pet.create({
        data: {
          name: 'doguinho',
          about: 'doguinho bonitinho',
          available: index < 3 ?? false,
          year_old: '3 anos',
          orgId: org.id,
        },
      })

      if (index === 0) petId = pet.id
    }

    const response = await request(app.server)
      .get(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: petId,
      }),
    )
  })
})
