import { render, screen } from '@testing-library/react'
import { Card } from './Card'


describe('Card', () => {
  it('Renderiza o card para o usuario', () => {
    render(<Card>Conteudo Card</Card>)
    expect(screen.getByText('Conteudo Card')).toBeInTheDocument()
  })

  it('Aplicará classe quando prioridade é alta', () => {
    render(<Card priority>Conteudo Card</Card>)
    const btn = screen.getByText('Conteudo Card')
    expect(btn.className).toContain('border-2')
  })
})