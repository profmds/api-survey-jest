import request from 'supertest'
import app from '../config/app'
import { mongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const passwordHashed = await hash('meupassword', 12)
      await accountCollection.insertOne({
        name: 'Marcelo',
        email: 'profmds@gmail.com',
        password: passwordHashed
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'profmds@gmail.com',
          password: 'meupassword'
        })
        .expect(200)
    })

    test('Should return 401 with invalid credentials on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'profmds@gmail.com',
          password: 'meupassword'
        })
        .expect(401)
    })
  })
})
