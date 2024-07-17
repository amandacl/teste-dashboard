import { z } from 'zod';

export const requestSchema = z.object({
  approver: z.string().min(1, "O campo Aprovador é obrigatório."),
  department: z.string().min(1, "O campo Departamento é obrigatório."),
  need_date: z.string().min(1, "O campo Data de Necessidade é obrigatório."),
  company: z.string().min(1, "O campo Empresa é obrigatório."),
  obs_intern: z.string(),
  obs_extern: z.string(),
  need_quote: z.boolean()  
});