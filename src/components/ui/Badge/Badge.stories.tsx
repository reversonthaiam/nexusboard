import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title:     'UI/Badge',
  component: Badge,
  tags:      ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Todo: Story = {
  args: { variant: 'todo', children: 'A fazer' },
}

export const InProgress: Story = {
  args: { variant: 'in_progress', children: 'Em andamento' },
}

export const Done: Story = {
  args: { variant: 'done', children: 'Concluído' },
}

export const High: Story = {
  args: { variant: 'high', children: 'Alta' },
}

export const Medium: Story = {
  args: { variant: 'medium', children: 'Média' },
}

export const Low: Story = {
  args: { variant: 'low', children: 'Baixa' },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="todo">A fazer</Badge>
      <Badge variant="in_progress">Em andamento</Badge>
      <Badge variant="done">Concluído</Badge>
    </div>
  ),
}

export const AllPriorities: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="high">Alta</Badge>
      <Badge variant="medium">Média</Badge>
      <Badge variant="low">Baixa</Badge>
    </div>
  ),
}