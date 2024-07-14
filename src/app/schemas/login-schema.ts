import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'campo obrigatório' })
    .min(1, { message: 'campo obrigatório' })
    .email({
      message: 'email inválido'
    }),
  password: z
    .string({ required_error: 'campo obrigatório' })
    .min(1, { message: 'campo obrigatório' })
})