import z from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.string().optional(),
  DATABASE: z.string(),
})

export const env = envSchema.parse(process.env)
