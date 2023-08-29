import { MongoClient } from 'mongodb'
import { env } from '../utils/envSchema'
import Papr from 'papr'
import 'dotenv/config'

export class Database {
  private client: MongoClient
  public papr: Papr

  constructor() {
    this.client = new MongoClient(env.DATABASE)
    this.papr = new Papr()

    this.connect()
  }

  async connect() {
    await this.client.connect()

    this.papr.initialize(this.client.db('test'))

    await this.papr.updateSchemas()
  }

  async disconnect() {
    await this.client.close()
  }
}
