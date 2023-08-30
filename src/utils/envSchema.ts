import z from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.string().optional(),
  DATABASE: z.string(),
  CLOUDINARY_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
