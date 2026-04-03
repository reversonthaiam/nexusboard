import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'

const meta: Meta<typeof Card> = {
  title:     'UI/Card',
  component: Card,
  tags:      ['autodocs'],
  argTypes: {
    priority: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'Conteúdo do card',
  },
}

export const WithPriority: Story = {
  args: {
    priority: true,
    children: 'Card com prioridade alta',
  },
}

export const TaskCard: Story = {
  render: () => (
    <Card>
      <h3 className="font-medium text-[#0f4c5c] mb-1">
        Revisar pull requests do time
      </h3>
      <p className="text-sm text-gray-500 mb-3">
        Checar 3 PRs pendentes no repositório principal
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="in_progress">Em andamento</Badge>
          <Badge variant="medium">Média</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Editar</Button>
          <Button variant="primary" size="sm">Concluir</Button>
        </div>
      </div>
    </Card>
  ),
}

export const TaskCardHighPriority: Story = {
  render: () => (
    <Card priority>
      <h3 className="font-medium text-[#0f4c5c] mb-1">
        Criar layout do relatório mensal
      </h3>
      <p className="text-sm text-gray-500 mb-3">
        Definir estrutura de seções e exportação PDF
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="todo">A fazer</Badge>
          <Badge variant="high">Alta</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Editar</Button>
          <Button variant="primary" size="sm">Concluir</Button>
        </div>
      </div>
    </Card>
  ),
}