import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PasswordStrengthIndicator } from '../password-strength-indicator'

describe('PasswordStrengthIndicator', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <PasswordStrengthIndicator label="Test Label" met={false} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the label correctly', () => {
    render(<PasswordStrengthIndicator label="Test Label" met={false} />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('displays a check icon when condition is met', () => {
    render(<PasswordStrengthIndicator label="Test Label" met={true} />)
    expect(screen.getByLabelText('Check')).toBeInTheDocument()
  })

  it('displays an X icon when condition is not met', () => {
    render(<PasswordStrengthIndicator label="Test Label" met={false} />)
    expect(screen.getByLabelText('X')).toBeInTheDocument()
  })

  it('applies correct text color when condition is met', () => {
    render(<PasswordStrengthIndicator label="Test Label" met={true} />)
    expect(screen.getByText('Test Label').closest('div')).toHaveClass(
      'text-green-500',
    )
  })

  it('applies correct text color when condition is not met', () => {
    render(<PasswordStrengthIndicator label="Test Label" met={false} />)
    expect(screen.getByText('Test Label').closest('div')).toHaveClass(
      'text-red-500',
    )
  })
})
