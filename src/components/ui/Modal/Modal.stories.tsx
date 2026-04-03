import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

const meta: Meta<typeof Modal> = {
  title:     'UI/Modal',
  component: Modal,
  tags:      ['autodocs'],
  argTypes: {
    isOpen:  { control: 'boolean' },
    title:   { control: 'text' },
    onClose: { action: 'closed' },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    isOpen:   true,
    title:    'Modal padrão',
    children: 'Conteúdo do modal',
  },
}

export const Closed: Story = {
  args: {
    isOpen:   false,
    title:    'Modal fechado',
    children: 'Não aparece',
  },
}

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir modal</Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Nova tarefa"
        >
          <div className="flex flex-col gap-4">
            <Input label="Título" placeholder="Digite o título..." />
            <Input label="Descrição" placeholder="Digite a descrição..." />
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary">
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>
      </>
    )
  },
}