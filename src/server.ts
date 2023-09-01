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
    this.app.register(cors, { origin: false })
    this.signRoutes = new SignRoutes(this.app)

    this.routes()
    this.start()
  }

  start() {
    this.app.listen({ port: PORT }, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }

  routes() {
    this.signRoutes.allRoutes()
  }
}

const app = new App()
app.start()
