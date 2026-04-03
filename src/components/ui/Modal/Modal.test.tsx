import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from './Modal'


describe('Modal', () => {
  it('Abrirá o modal quando isOpen é true', () => {
    render(<Modal isOpen>Conteudo modal</Modal>)
    expect(screen.getByText('Conteudo modal')).toBeInTheDocument()
  })

  it('O modal não abrirá quando isOpen é falso', () => {
    render(<Modal isOpen={false}>Conteudo modal</Modal>)
    expect(screen.queryByText('Conteudo modal')).not.toBeInTheDocument()
  })

  it('Fechará o modal quando clicar para fechar', () => {
    const handleClose = jest.fn()
    render(<Modal isOpen onClose={handleClose}>Conteudo modal</Modal>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
