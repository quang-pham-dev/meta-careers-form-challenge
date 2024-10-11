import React from 'react'
import { render, screen } from '@testing-library/react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../form'
import { Input } from '../input'

describe('Form', () => {
  const TestForm = () => {
    const form = useForm<FieldValues>()
    const onSubmit: SubmitHandler<FieldValues> = data => console.log(data)

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormDescription>This is your public username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }

  it('matches snapshot', () => {
    const { asFragment } = render(<TestForm />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders form components correctly', () => {
    render(<TestForm />)

    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
    expect(
      screen.getByText('This is your public username.'),
    ).toBeInTheDocument()
  })

  it('applies correct classes to form components', () => {
    render(<TestForm />)

    expect(screen.getByText('Username')).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    )
    expect(screen.getByPlaceholderText('Enter username')).toHaveClass(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-base sm:text-sm',
    )
    expect(screen.getByText('This is your public username.')).toHaveClass(
      'text-[0.8rem] text-muted-foreground',
    )
  })
})
