import { ComparePassword } from '@/contract/password'
import { compare } from 'bcryptjs'

export class CompareHashProduction implements ComparePassword {
  async compareHash(password: string, passwordHash: string): Promise<boolean> {
    const doesPasswordMatchs: boolean = await compare(password, passwordHash)

    return doesPasswordMatchs
  }
}
