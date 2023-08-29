import { FastifyInstance } from 'fastify'
import { SignController } from '../controllers/signController'

export class SignRoutes {
  public app: FastifyInstance
  private signController: SignController
  constructor(app: FastifyInstance) {
    this.app = app
    this.signController = new SignController(this.app)
  }

  getAllSigns() {
    this.app.get('/signs', (request, reply) => {
      this.signController.index(request, reply)
    })
  }

  getSignById() {
    this.app.get('/signs/:id', (request, reply) => {
      this.signController.show(request, reply)
    })
  }

  createSign() {
    this.app.post('/signs', (request, reply) => {
      this.signController.store(request, reply)
    })
  }

  deleteSignById() {
    this.app.delete('/signs/:id', (request, reply) => {
      this.signController.delete(request, reply)
    })
  }

  updateSignById() {
    this.app.put('/signs/:id', (request, reply) => {
      this.signController.update(request, reply)
    })
  }

  allRoutes() {
    this.getAllSigns()
    this.getSignById()
    this.createSign()
    this.deleteSignById()
    this.updateSignById()
  }
}
