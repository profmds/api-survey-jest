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

    if (!httpRequest.body.email) {
      errorRequest = new MissingParamError('email')
    }
    if (!httpRequest.body.password) {
      errorRequest = new MissingParamError('password')
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValid) {
      errorRequest = new InvalidParamError('email')
    }

    return await new Promise(resolve => resolve(
      badRequest(errorRequest)
    ))
  }
}
