'use client'

import {
  useState,
  useEffect,
  useRef,
  useActionState,
  startTransition,
  useCallback,
} from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, CheckCircle2, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PasswordStrengthIndicator } from '@/components/sections'
import { SubmitButton } from '@/components/ui/submit-button'
import { submitSignUpForm } from '@/actions'
import { COUNTRY_CODES } from '@/constants'
import {
  type FormValues,
  type FormState,
  clientSignUpSchema,
} from '@/validations'
import { cn } from '@/lib/utils'

const PASSWORD_STRENGTH_INDICATORS = [
  { label: 'At least 6 characters', met: ['length'] },
  { label: 'One number', met: ['number'] },
  { label: 'One symbol', met: ['symbol'] },
] as const

const PASSWORD_REQUIREMENTS = {
  length: (value: string) => value.length >= 6,
  number: (value: string) => /\d/.test(value),
  symbol: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
} as const

type PasswordStrength = Record<keyof typeof PASSWORD_REQUIREMENTS, boolean>

// Update the initialState to match the FormState type
const initialState: FormState = {
  message: '',
  data: null,
  error: [],
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    length: false,
    number: false,
    symbol: false,
  })

  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(
    submitSignUpForm,
    initialState,
  )
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(clientSignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      countryCode: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  })

  const password = form.watch('password')
  const confirmPassword = form.watch('confirmPassword')

  useEffect(() => {
    if (!password) {
      setPasswordStrength({
        length: false,
        number: false,
        symbol: false,
      })
      return
    }

    setPasswordStrength({
      length: PASSWORD_REQUIREMENTS.length(password),
      number: PASSWORD_REQUIREMENTS.number(password),
      symbol: PASSWORD_REQUIREMENTS.symbol(password),
    })
  }, [password])

  // Success notification
  useEffect(() => {
    if (state.data) {
      toast({
        title: 'Success!',
        description: 'Your account has been created successfully.',
        variant: 'default',
      })

      form.reset()
    }
  }, [state.data])

  const submitForm = useCallback(
    async (values: FormValues) => {
      if (!formRef.current) return

      startTransition(() => {
        const formData = new FormData(formRef.current!)

        // Only append non-null and non-undefined values
        Object.entries(values).forEach(([key, value]) => {
          if (key !== 'confirmPassword' && value != null) {
            formData.append(key, value.toString())
          }
        })

        formAction(formData)
      })
    },
    [formAction],
  )

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(submitForm)}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} error={!!fieldState.error} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} error={!!fieldState.error} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder=""
                  {...field}
                  error={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Country Code</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRY_CODES.map(country => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Mobile phone number (Optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    maxLength={50}
                    {...field}
                    error={
                      !!fieldState.error ||
                      (!!password.length &&
                        (!passwordStrength.length ||
                          !passwordStrength.number ||
                          !passwordStrength.symbol))
                    }
                    className="pr-20"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      {password.length}/50
                    </span>
                    {!!password.length &&
                      (passwordStrength.length &&
                      passwordStrength.number &&
                      passwordStrength.symbol ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className={cn(
                        `
                        h-full rounded-l-none border-l-2 bg-gray-100 hover:bg-gray-200`,
                        (!!fieldState.error ||
                          (!!password.length &&
                            (!passwordStrength.length ||
                              !passwordStrength.number ||
                              !passwordStrength.symbol))) &&
                          'border-l-red-500',
                      )}>
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4 mr-2" />
                      ) : (
                        <EyeIcon className="h-4 w-4 mr-2" />
                      )}
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />

              {!!password && (
                <div className="mt-2 space-y-1">
                  {PASSWORD_STRENGTH_INDICATORS.map(indicator => (
                    <PasswordStrengthIndicator
                      key={indicator.label}
                      label={indicator.label}
                      met={
                        passwordStrength[
                          indicator.met[0] as keyof typeof passwordStrength
                        ]
                      }
                    />
                  ))}
                </div>
              )}
            </FormItem>
          )}
        />

        {password && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      maxLength={50}
                      {...field}
                      error={
                        !!fieldState.error ||
                        (password !== confirmPassword && field.value.length > 0)
                      }
                      className="pr-20"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        {field.value.length}/50
                      </span>
                      {!!field.value.length &&
                        (password === confirmPassword ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 mr-2" />
                        ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={cn(
                          `
                          h-full rounded-l-none border-l-2 bg-gray-100 hover:bg-gray-200`,
                          (!!fieldState.error ||
                            (password !== confirmPassword &&
                              field.value.length > 0)) &&
                            'border-l-red-500',
                        )}>
                        {showConfirmPassword ? (
                          <EyeOffIcon className="h-4 w-4 mr-2" />
                        ) : (
                          <EyeIcon className="h-4 w-4 mr-2" />
                        )}
                        {showConfirmPassword ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex flex-col justify-end">
          {state?.errors ? (
            <div className="text-red-500">
              <ul>
                {state.errors?.map(issue => (
                  <li key={issue} className="flex gap-1">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <SubmitButton isPending={isPending} />
        </div>
        <p>
          Already have a Career Profile?{' '}
          <Link href="#" className="text-blue-700 text-bold hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </Form>
  )
}
