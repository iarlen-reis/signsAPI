import { ReadStream } from 'fs'

export interface IFile {
  type: string
  fieldname: string
  filename: string
  encoding: string
  mimetype: string
  file: ReadStream
}

export interface IFormData {
  fields: {
    name: {
      value: string
    }
    description: {
      value: string
    }
    period: {
      value: string
    }
    compatility: {
      value: string
    }
    file: IFile
  }
}
