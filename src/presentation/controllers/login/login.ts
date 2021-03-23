import { MissingParamError } from '../../error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let stringError = ''

    if (!httpRequest.body.email) {
      stringError = 'email'
    }
    if (!httpRequest.body.password) {
      stringError = 'password'
    }

    this.emailValidator.isValid(httpRequest.body.email)

    return await new Promise(resolve => resolve(
      badRequest(new MissingParamError(stringError))
    ))
  }
}
