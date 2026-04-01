import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title:     'UI/Button',
  component: Button,
  tags:      ['autodocs'],  // gera documentação automática
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Botão primário' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Botão secundário' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Deletar' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancelar' },
}

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Salvando...' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Indisponível' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
}