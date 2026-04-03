import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('vai renderizar o label digitado pelo usuario corretamente', () => {
    render(<Input label="Valor digitado" />)
    expect(screen.getByLabelText('Valor digitado')).toBeInTheDocument()
  })

  it('input vai mostrar erro ao usuario quando não inserido algo correto', () => {
    render(<Input error="valor incorreto" label="email@email" />)
    expect(screen.getByText('valor incorreto')).toBeInTheDocument()
  })

  it('usuario deverá conseguir digitar algo em tela', () => {
    render(<Input label="Valor digitado" />)
    const input = screen.getByLabelText('Valor digitado')
    fireEvent.change(input, { target: { value: 'Valor digitado'}})
    expect(screen.getByDisplayValue('Valor digitado')).toBeInTheDocument()
  })
})

