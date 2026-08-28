import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FormField from './FormField'

describe('FormField', () => {
  it('wires errors to the input for assistive tech', () => {
    render(
      <FormField label="Email" htmlFor="email" error="Email is required">
        <input id="email" />
      </FormField>,
    )
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby')
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required')
  })

  it('links the error id to the error message', () => {
    render(
      <FormField label="Email" htmlFor="email" error="Email is required">
        <input id="email" />
      </FormField>,
    )
    const input = screen.getByLabelText('Email')
    const describedBy = input.getAttribute('aria-describedby')
    expect(document.getElementById(describedBy)).toHaveTextContent('Email is required')
  })

  it('marks required fields visually', () => {
    render(
      <FormField label="Name" htmlFor="name">
        <input id="name" required />
      </FormField>,
    )
    expect(screen.getByLabelText(/Name/).closest('div').querySelector('label').textContent).toContain('*')
  })
})
