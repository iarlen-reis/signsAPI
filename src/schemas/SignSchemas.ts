import z from 'zod'

export const createSignSchema = z.object({
  name: z.string(),
  description: z.array(z.string()),
  period: z.string(),
  compatility: z.array(z.string()),
  characteristics: z.array(z.string()),
  file: z.any(),
})

export const getSignSchema = z.object({
  id: z.string(),
})
