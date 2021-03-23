import { MissingParamError } from '../../error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let stringError = ''

    if (!httpRequest.body.email) {
      stringError = 'email'
    }
    if (!httpRequest.body.password) {
      stringError = 'password'
    }
    return await new Promise(resolve => resolve(
      badRequest(new MissingParamError(stringError))
    ))
  }
}
