import fastify, { FastifyInstance } from 'fastify'
import { SignRoutes } from './routes/signsRoutes'
import 'dotenv/config'

class App {
  public app: FastifyInstance
  public signRoutes: SignRoutes
  constructor() {
    this.app = fastify()
    this.signRoutes = new SignRoutes(this.app)

    this.routes()
    this.start()
  }

  start() {
    this.app.listen({ port: 3000 }, () => {
      console.log('Server listening on port 3000')
    })
  }

  routes() {
    this.signRoutes.allRoutes()
  }
}

const app = new App()
app.start()
