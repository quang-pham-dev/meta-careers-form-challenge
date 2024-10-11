import { z } from 'zod'

const REQUIRED_FIELD_MESSAGE = 'This field is required'

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, REQUIRED_FIELD_MESSAGE),
    lastName: z.string().min(2, REQUIRED_FIELD_MESSAGE),
    email: z
      .string()
      .min(1, REQUIRED_FIELD_MESSAGE)
      .email('Invalid email address'),
    phoneNumber: z.string().optional(),
    countryCode: z.string().optional(),
    password: z.string().min(1, REQUIRED_FIELD_MESSAGE),
    confirmPassword: z.string().min(1, REQUIRED_FIELD_MESSAGE),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>

export interface FormState {
  message: string
  data: FormValues | null
  error?: string[]
}
