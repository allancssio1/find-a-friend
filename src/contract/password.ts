export interface ComparePassword {
  compareHash(password: string, passwordHash: string): Promise<boolean>
}
