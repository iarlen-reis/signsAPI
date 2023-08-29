import z from 'zod'

export const createSignSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  period: z.string(),
  compatility: z.array(z.string()),
})

export const getSignSchema = z.object({
  id: z.string(),
})
