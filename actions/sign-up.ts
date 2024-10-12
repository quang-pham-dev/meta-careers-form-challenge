'use server'

import { z } from 'zod'
import { signUpSchema } from '@/validations/sign-up-schema'
import { revalidatePath } from 'next/cache'

export interface FormState {
  message: string
  data: z.infer<typeof signUpSchema> | null
  errors?: string[]
}

export async function submitSignUpForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const ERROR_MESSAGE = '[SIGN-UP] Failed to submit the form'
  try {
    const parsed = signUpSchema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      phoneNumber: formData.get('phoneNumber'),
      countryCode: formData.get('countryCode'),
    })

    if (!parsed.success) {
      return {
        ...prevState,
        data: null,
        errors: parsed.error.issues.map(error => error.message),
      }
    }

    const data = parsed.data

    // Revalidate the home page
    revalidatePath('/')

    return {
      data,
      message: 'Form submitted successfully',
    }
  } catch (error) {
    // TODO: Log the error to an error tracking service
    console.log('[SIGN-UP] error', error)
    return {
      data: null,
      message: ERROR_MESSAGE,
      errors:
        error instanceof Error
          ? [error.message]
          : ['An unknown error occurred'],
    }
  }
}
