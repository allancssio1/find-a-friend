export class LoginError extends Error {
  constructor() {
    super('Credentials are not correct')
  }
}
