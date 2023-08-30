import { ZodError } from 'zod'
import { ObjectId } from 'mongodb'
import Sign from '../models/signModel'
import { IFormData } from '../@types/ISignController'
import { uploadClaudinary } from '../utils/uploadClaudinary'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createSignSchema, getSignSchema } from '../schemas/SignSchemas'

export class SignController {
  public app: FastifyInstance
  constructor(app: FastifyInstance) {
    this.app = app
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    try {
      const signs = await Sign.find({})

      reply.status(200).send({
        signs,
      })
    } catch (error) {
      const { message } = error as ZodError
      reply.status(400).send({
        message,
      })
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = getSignSchema.parse(request.params)

      const sign = await Sign.findById(new ObjectId(id))

      reply.status(200).send({
        sign,
      })
    } catch (error) {
      const { message } = error as ZodError
      reply.status(400).send({
        message,
      })
    }
  }

  async store(request: FastifyRequest, reply: FastifyReply) {
    try {
      const formData = (await request.file()) as unknown as IFormData

      const formatData = {
        name: formData.fields.name.value,
        description: formData.fields.description.value,
        period: formData.fields.period.value,
        compatility: JSON.parse(formData.fields.compatility.value),
        file: formData.fields.file,
      }

      const data = createSignSchema.parse(formatData)

      const saveResult = await uploadClaudinary(data.file)

      const sign = await Sign.insertOne({
        name: data.name,
        image: saveResult.url,
        description: data.description,
        period: data.period,
        compatility: data.compatility,
      })

      reply.status(200).send({
        sign,
      })
    } catch (error) {
      const { message } = error as ZodError
      reply.status(400).send({
        message,
      })
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = getSignSchema.parse(request.params)

      await Sign.deleteMany({ _id: new ObjectId(id) })

      reply.status(200).send({
        message: 'Sign deleted',
      })
    } catch (error) {
      console.log(error)
      const { message } = error as ZodError
      reply.status(400).send({
        message,
      })
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = getSignSchema.parse(request.params)

      const updateSign = createSignSchema.parse(request.body)

      await Sign.updateOne({ _id: new ObjectId(id) }, { $set: updateSign })

      reply.status(200).send({
        sign: updateSign,
      })
    } catch (error) {
      console.log(error)
      const { message } = error as ZodError
      reply.status(400).send({
        message,
      })
    }
  }
}
