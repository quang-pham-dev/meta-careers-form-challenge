import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

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
  })
  .refine(
    data => {
      if (!data.countryCode && !data.phoneNumber) {
        return true // Both fields are empty, so it's valid
      }
      if (!data.countryCode || !data.phoneNumber) {
        return false // One field is filled, but not the other
      }
      const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`
      return isValidPhoneNumber(fullPhoneNumber)
    },
    {
      message: 'Invalid phone number or missing country code',
      path: ['phoneNumber'],
    },
  )

export const clientSignUpSchema = signUpSchema
  .innerType()
  .extend({
    confirmPassword: z.string().min(1, REQUIRED_FIELD_MESSAGE),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof clientSignUpSchema>

export interface FormState {
  message: string
  data: FormValues | null
  error?: string[]
}
