import { InvalidParamError, MissingParamError } from '../../error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let errorRequest
    const { email, password } = httpRequest.body

    if (!email) {
      errorRequest = new MissingParamError('email')
    }
    if (!password) {
      errorRequest = new MissingParamError('password')
    }

    const isValid = this.emailValidator.isValid(email)

    if (!isValid) {
      errorRequest = new InvalidParamError('email')
    }

    return await new Promise(resolve => resolve(
      badRequest(errorRequest)
    ))
  }
}
