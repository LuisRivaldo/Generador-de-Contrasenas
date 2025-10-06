import { z } from "zod"

export const passwordSchema = z.object({
    title: z.string().trim().min(1, "Titulo requerido"),
    password: z.string().min(4, "La constraseña debe tener al menos 4 caracteres"),
    length: z.number().min(4).max(48).optional(),
    hasUppercase: z.boolean().optional(),
    hasLowercase: z.boolean().optional(),
    hasNumbers: z.boolean().optional(),
    hasSymbols: z.boolean().optional()
})

export type PasswordSchemaType = z.infer<typeof passwordSchema>