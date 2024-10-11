import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { FeatureInformation } from '../feature-information'

// Mock the constants module
vi.mock('@/constants', () => ({
  FEATURES_INFORMATION: [
    { title: 'Feature 1', description: 'Description 1' },
    { title: 'Feature 2', description: 'Description 2' },
  ],
}))

vi.mock('@/components/sections/feature-description', () => ({
  FeatureDescription: ({
    title,
    description,
  }: {
    title: string
    description: string
  }) => (
    <div data-testid="feature-description">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}))

describe('FeatureInformation', () => {
  it('renders the component correctly', () => {
    render(<FeatureInformation />)

    // Check if the main title is rendered
    expect(screen.getByText('Sign up for Career Profile')).toBeInTheDocument()

    // Check if the description paragraph is rendered
    expect(
      screen.getByText(
        /Create a Career Profile to keep track of your applications/,
      ),
    ).toBeInTheDocument()

    // Check if "Additional Features" text is rendered
    expect(screen.getByText('Additional Features')).toBeInTheDocument()

    // Check if all feature descriptions are rendered
    const featureDescriptions = screen.getAllByTestId('feature-description')
    expect(featureDescriptions).toHaveLength(2) // Use the mocked length

    // Check if each feature title and description is rendered
    expect(screen.getByText('Feature 1')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Feature 2')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<FeatureInformation />)
    expect(asFragment()).toMatchSnapshot()
  })
})
