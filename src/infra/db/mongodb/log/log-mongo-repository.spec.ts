import { Collection } from 'mongodb'
import { mongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log-mongo-repository'

describe('Log MongoDb Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await mongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository()
  }

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
