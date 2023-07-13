export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server error. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
    this.message = error?.message ?? ''
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Não autorizado')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'ForbiddenError'
  }
}
