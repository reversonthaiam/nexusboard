import { useMemo } from 'react'
import { useAppSelector } from '../store/hooks'
import { selectStats } from '../features/tasks/tasksSlice'
import { Card } from '../components/ui/Card/Card'
import { Badge } from '../components/ui/Badge/Badge'

function StatCard({ label, value, color }: {
  label: string
  value: number
  color: string
}) {
  return (
    <Card>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-medium ${color}`}>{value}</p>
    </Card>
  )
}

export default function Dashboard() {
  const stats = useAppSelector(selectStats)

  const statCards = useMemo(() => [
    { label: 'Total',       value: stats.total,       color: 'text-[#0f4c5c]' },
    { label: 'To do',       value: stats.todo,        color: 'text-[#5f0f40]' },
    { label: 'In progress', value: stats.in_progress, color: 'text-[#e36414]' },
    { label: 'Done',        value: stats.done,        color: 'text-[#0f4c5c]' },
  ], [stats])

  return (
    <div>
      <h2 className="text-2xl font-medium text-[#0f4c5c] mb-6">Dashboard</h2>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {statCards.map(card => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-[#0f4c5c]">Overall progress</p>
          <p className="text-sm font-medium text-[#5f0f40]">{stats.progress}%</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-[#5f0f40] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </Card>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-[#0f4c5c] mb-4">
          Recent tasks
        </h3>
        <RecentTasks />
      </div>
    </div>
  )
}

function RecentTasks() {
  const tasks = useAppSelector(state =>
    state.tasks.items.slice(0, 5)
  )

  if (tasks.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-400 py-4">
          No tasks yet
        </p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map(task => (
        <Card key={task.id} priority={task.priority === 'high'}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#0f4c5c]">{task.title}</p>
              <p className="text-sm text-gray-400 mt-0.5">{task.description}</p>
            </div>
            <div className="flex gap-2 ml-4 shrink-0">
              <Badge variant={task.status}>
                {task.status === 'todo'        ? 'To do'       :
                 task.status === 'in_progress' ? 'In progress' : 'Done'}
              </Badge>
              <Badge variant={task.priority}>
                {task.priority === 'high'   ? 'High'   :
                 task.priority === 'medium' ? 'Medium' : 'Low'}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}