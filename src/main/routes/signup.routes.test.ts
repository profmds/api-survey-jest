import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Marcelo',
        email: 'profmds@gmail.com',
        password: 'meupassword',
        passwordConfirmation: 'meupassword'
      })
      .expect(200)
  })
})
