import { ComparePassword } from '@/contract/password'
import { env } from '@/env'
import { compare } from 'bcryptjs'

export class CompareHash implements ComparePassword {
  async compareHash(password: string, passwordHash: string): Promise<boolean> {
    let doesPasswordMatchs: boolean

    if (env.NODE_ENV === 'dev' || env.NODE_ENV === 'test') {
      doesPasswordMatchs = password === passwordHash
    } else {
      doesPasswordMatchs = await compare(password, passwordHash)
    }
    return doesPasswordMatchs
  }
}
