'use server'

import { z } from 'zod'
import { signUpSchema } from '@/validations/sign-up-schema'
import { revalidatePath } from 'next/cache'

export interface FormState {
  message: string
  data: z.infer<typeof signUpSchema> | null
  errors?: string[]
}

const ERROR_MESSAGES = {
  VALIDATION: 'Please check your input and try again',
  SERVER: 'An error occurred while processing your request',
  UNKNOWN: 'An unexpected error occurred',
} as const

export async function submitSignUpForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    // Extract and validate form data
    const rawFormData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      phoneNumber: formData.get('phoneNumber'),
      countryCode: formData.get('countryCode'),
    }

    const validationResult = signUpSchema.safeParse(rawFormData)

    if (!validationResult.success) {
      return {
        ...prevState,
        data: null,
        message: ERROR_MESSAGES.VALIDATION,
        errors: validationResult.error.issues.map(issue => issue.message),
      }
    }

    const data = validationResult.data

    try {
      // Here you would typically:
      // 1. Hash the password
      // 2. Check if email already exists
      // 3. Create user in database
      // 4. Send verification email
      // 5. Create session/token

      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Revalidate the cache
      revalidatePath('/')

      return {
        data,
        message: 'Account created successfully',
        errors: undefined,
      }
    } catch (error) {
      console.error('[SIGN-UP] Server error:', error)
      return {
        data: null,
        message: ERROR_MESSAGES.SERVER,
        errors: [
          error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN,
        ],
      }
    }
  } catch (error) {
    console.error('[SIGN-UP] Unexpected error:', error)
    return {
      data: null,
      message: ERROR_MESSAGES.UNKNOWN,
      errors: [ERROR_MESSAGES.UNKNOWN],
    }
  }
}
