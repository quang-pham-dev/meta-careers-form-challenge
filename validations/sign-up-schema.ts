import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

const MESSAGES = {
  required: 'This field is required',
  firstName: {
    min: 'First name must be at least 2 characters',
    max: 'First name must be less than 50 characters',
  },
  lastName: {
    min: 'Last name must be at least 2 characters',
    max: 'Last name must be less than 50 characters',
  },
  email: {
    invalid: 'Please enter a valid email address',
  },
  password: {
    min: 'Password must be at least 6 characters',
    max: 'Password must be less than 100 characters',
    requirements: 'Password must contain at least one number and one symbol',
  },
  phone: {
    invalid: 'Please enter a valid phone number',
    missingCode: 'Please select a country code',
  },
} as const

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, MESSAGES.firstName.min)
      .max(50, MESSAGES.firstName.max)
      .trim(),
    lastName: z
      .string()
      .min(2, MESSAGES.lastName.min)
      .max(50, MESSAGES.lastName.max)
      .trim(),
    email: z
      .string()
      .min(1, MESSAGES.required)
      .email(MESSAGES.email.invalid)
      .toLowerCase()
      .trim(),
    phoneNumber: z.string().optional(),
    countryCode: z.string().optional(),
    password: z
      .string()
      .min(6, MESSAGES.password.min)
      .max(100, MESSAGES.password.max)
      .regex(
        /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
        MESSAGES.password.requirements,
      ),
  })
  .refine(
    ({ countryCode, phoneNumber }) => {
      if (!countryCode && !phoneNumber) return true
      if (!countryCode) return false
      if (!phoneNumber) return false

      try {
        return isValidPhoneNumber(`${countryCode}${phoneNumber}`)
      } catch {
        return false
      }
    },
    {
      message: MESSAGES.phone.invalid,
      path: ['phoneNumber'],
    },
  )

export const clientSignUpSchema = signUpSchema
  .innerType()
  .extend({
    confirmPassword: z.string().min(1, MESSAGES.required),
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
