import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../select'

describe('Select', () => {
  const TestSelect = () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  )

  it('matches snapshot', () => {
    const { asFragment } = render(<TestSelect />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders select trigger correctly', () => {
    render(<TestSelect />)
    expect(screen.getByText('Select a fruit')).toBeInTheDocument()
  })

  it('opens select content on trigger click', () => {
    render(<TestSelect />)
    const trigger = screen.getByText('Select a fruit')
    fireEvent.click(trigger)
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    expect(screen.getByText('Orange')).toBeInTheDocument()
  })

  it('selects an item when clicked', () => {
    render(<TestSelect />)
    const trigger = screen.getByText('Select a fruit')
    fireEvent.click(trigger)
    const appleOption = screen.getByText('Apple')
    fireEvent.click(appleOption)
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('applies custom className to SelectTrigger', () => {
    render(<TestSelect />)
    const trigger = screen.getByText('Select a fruit').closest('button')
    expect(trigger).toHaveClass('w-[180px]')
  })

  it('closes select content when an item is selected', () => {
    render(<TestSelect />)
    const trigger = screen.getByText('Select a fruit')
    fireEvent.click(trigger)
    const bananaOption = screen.getByText('Banana')
    fireEvent.click(bananaOption)
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    expect(screen.queryByText('Orange')).not.toBeInTheDocument()
  })
})
