import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'required field' })
    .min(1, { message: 'required field' })
    .email({
      message: 'invalid email'
    }),
  password: z
    .string({ required_error: 'required field' })
    .min(1, { message: 'required field' })
})