import fastify, { FastifyInstance } from 'fastify'
import { SignRoutes } from './routes/signsRoutes'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import './services/cloudinary'
import 'dotenv/config'

const PORT: number = Number(process.env.PORT) || 3333

class App {
  public app: FastifyInstance
  public signRoutes: SignRoutes
  constructor() {
    this.app = fastify()
    this.app.register(multipart)
    this.app.register(cors, {
      origin: '*',
      methods: ['GET'],
    })
    this.signRoutes = new SignRoutes(this.app)

    this.routes()
    this.start()
  }

  start() {
    this.app.get('/', (request, reply) => {
      reply.status(200).type('html').send('<h1>Horoscope API</h1>')
    })

    this.app.listen({ port: PORT, host: '0.0.0.0' }, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }

  routes() {
    this.signRoutes.allRoutes()
  }
}

const app = new App()
