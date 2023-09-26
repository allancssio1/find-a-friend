import { ORG } from '@/entities/org-entity'
import { LoginError } from '@/errors/login-errors'
import { OrgRepository } from '@/repositories/org-repository'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: ORG
}

export class LoginUseCase {
  constructor(private readonly repository: OrgRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.repository.findByEmail(email)

    if (!org) throw new LoginError()

    const doesPasswordMatchs = await compare(
      password,
      String(org.password_hash),
    )

    if (!doesPasswordMatchs) throw new LoginError()

    return { org }
  }
}
