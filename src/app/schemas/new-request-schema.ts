import { z } from 'zod';

export const requestSchema = z.object({
  approver: z.string().min(1, "O campo Aprovador é obrigatório."),
  department: z.string().min(1, "O campo Departamento é obrigatório."),
  need_date: z.string().min(1, "O campo Data de Necessidade é obrigatório."),
  company: z.string().min(1, "O campo Empresa é obrigatório."),
  obs_intern: z.string(),
  obs_extern: z.string(),
  need_quote: z.boolean(),
  products: z.array(
    z.object({
      name: z.string().min(1, "O nome do produto é obrigatório."),
      unit: z.string().min(1, "A unidade do produto é obrigatória."),
      quant: z
        .number()
        .min(1, "A quantidade do produto deve ser maior que zero."),
    })
  ),
});