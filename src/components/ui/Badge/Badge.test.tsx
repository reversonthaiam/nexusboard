import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renderiza o texto corretamente', () => {
    render(<Badge variant="todo">A fazer</Badge>)
    expect(screen.getByText('A fazer')).toBeInTheDocument()
  })

  it('aplica a cor correta para todo', () => {
    render(<Badge variant="todo">A fazer</Badge>)
    expect(screen.getByText('A fazer').className).toContain('text-[#5f0f40]')
  })

  it('aplica a cor correta para in_progress', () => {
    render(<Badge variant="in_progress">Em andamento</Badge>)
    expect(screen.getByText('Em andamento').className).toContain('text-[#e36414]')
  })

  it('aplica a cor correta para done', () => {
    render(<Badge variant="done">Concluído</Badge>)
    expect(screen.getByText('Concluído').className).toContain('text-[#0f4c5c]')
  })

  it('aplica a cor correta para high', () => {
    render(<Badge variant="high">Alta</Badge>)
    expect(screen.getByText('Alta').className).toContain('text-[#9a031e]')
  })
})