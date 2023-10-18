import { ComparePassword } from '@/contract/password'
import { LoginError } from '@/errors/login-errors'
import { OrgRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class LoginUseCase {
  constructor(
    private readonly repository: OrgRepository,
    private readonly compare: ComparePassword,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.repository.findByEmail(email)

    if (!org) throw new LoginError()

    const doesPasswordMatchs = this.compare.compareHash(
      password,
      org.password_hash,
    )

    if (!doesPasswordMatchs) throw new LoginError()

    return { org }
  }
}
