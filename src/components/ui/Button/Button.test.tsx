import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza o texto corretamente', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument()
  })

  it('chama o onClick quando clicado', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clique</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('não chama onClick quando disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Clique</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('não chama onClick quando loading', () => {
    const handleClick = jest.fn()
    render(<Button loading onClick={handleClick}>Clique</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('aplica a variante danger corretamente', () => {
    render(<Button variant="danger">Deletar</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-[#9a031e]')
  })
})