import { types, schema } from 'papr'
import { Database } from '../database/papr'

const database = new Database()

const signSchema = schema({
  name: types.string(),
  image: types.string(),
  description: types.string(),
  period: types.string(),
  compatility: types.array(types.string()),
})

export type SignDocument = (typeof signSchema)[0]

const Sign = database.papr.model('Sign', signSchema)

export default Sign
