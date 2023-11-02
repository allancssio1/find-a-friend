import { ComparePassword } from '@/contract/password'

export class CompareHashTests implements ComparePassword {
  async compareHash(password: string, passwordHash: string): Promise<boolean> {
    const doesPasswordMatchs: boolean = password === passwordHash ?? false

    return doesPasswordMatchs
  }
}
