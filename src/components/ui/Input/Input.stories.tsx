import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title:     'UI/Input',
  component: Input,
  tags:      ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    error:       { control: 'text' },
    placeholder: { control: 'text' },
    disabled:    { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label:       'Título da tarefa',
    placeholder: 'Digite o título...',
  },
}

export const WithError: Story = {
  args: {
    label:       'Email',
    placeholder: 'Digite seu email...',
    error:       'Email inválido',
  },
}

export const Disabled: Story = {
  args: {
    label:    'Campo desabilitado',
    disabled: true,
    value:    'Não pode editar',
  },
}

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input label="Título" placeholder="Digite o título..." />
      <Input label="Descrição" placeholder="Digite a descrição..." />
      <Input
        label="Email"
        placeholder="email@exemplo.com"
        error="Email inválido"
      />
    </div>
  ),
}