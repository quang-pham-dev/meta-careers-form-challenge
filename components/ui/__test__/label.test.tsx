import React from 'react'
import { render, screen } from '@testing-library/react'
import { Label } from '../label'

describe('Label', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Label>Snapshot Label</Label>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders label element correctly', () => {
    render(<Label htmlFor="test-input">Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    render(<Label>Default Label</Label>)
    const label = screen.getByText('Default Label')
    expect(label).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    )
  })

  it('applies custom className', () => {
    render(<Label className="custom-class">Custom Label</Label>)
    const label = screen.getByText('Custom Label')
    expect(label).toHaveClass('custom-class')
  })

  it('forwards additional props to label element', () => {
    render(<Label data-testid="custom-label">Prop Label</Label>)
    const label = screen.getByTestId('custom-label')
    expect(label).toHaveTextContent('Prop Label')
  })

  it('associates label with input using htmlFor', () => {
    render(
      <>
        <Label htmlFor="test-input">Associated Label</Label>
        <input id="test-input" />
      </>,
    )
    const label = screen.getByText('Associated Label')
    expect(label).toHaveAttribute('for', 'test-input')
  })
})
