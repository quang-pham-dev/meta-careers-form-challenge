import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Button>Snapshot Button</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders a button with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary')
    expect(button).toHaveClass('text-primary-foreground')
    expect(button).toHaveClass('h-9')
  })

  it('renders a button with custom variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: /delete/i })
    expect(button).toHaveClass('bg-destructive')
    expect(button).toHaveClass('text-destructive-foreground')
  })

  it('renders a button with custom size', () => {
    render(<Button size="sm">Small Button</Button>)
    const button = screen.getByRole('button', { name: /small button/i })
    expect(button).toHaveClass('h-8')
    expect(button).toHaveClass('rounded-md')
    expect(button).toHaveClass('px-3')
    expect(button).toHaveClass('text-xs')
  })

  it('renders as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('inline-flex')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    const button = screen.getByRole('button', { name: /custom button/i })
    expect(button).toHaveClass('custom-class')
  })

  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
