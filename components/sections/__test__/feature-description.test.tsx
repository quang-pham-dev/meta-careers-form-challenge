import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { FeatureDescription } from '../feature-description'

describe('FeatureDescription', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
  }

  it('matches snapshot', () => {
    const { asFragment } = render(<FeatureDescription {...mockProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the title correctly', () => {
    render(<FeatureDescription {...mockProps} />)
    const titleElement = screen.getByText(mockProps.title)
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe('H3')
    expect(titleElement).toHaveClass('text-xl font-semibold mb-2')
  })

  it('renders the description correctly', () => {
    render(<FeatureDescription {...mockProps} />)
    const descriptionElement = screen.getByText(mockProps.description)
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement.tagName).toBe('P')
    expect(descriptionElement).toHaveClass('text-gray-600')
  })
})
