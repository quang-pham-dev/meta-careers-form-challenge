import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from '../input'

describe('Input', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Input placeholder="Enter text" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders input element correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-base sm:text-sm',
    )
  })

  it('applies error class when error prop is true', () => {
    render(<Input error={true} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-500')
  })

  it('forwards additional props to input element', () => {
    render(<Input data-testid="custom-input" type="email" required />)
    const input = screen.getByTestId('custom-input')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('required')
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })
})
