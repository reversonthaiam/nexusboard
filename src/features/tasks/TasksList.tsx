import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectFilteredTasks,
  setFilter,
  deleteTask,
  changeStatus,
} from "./tasksSlice";
import { Card } from "../../components/ui/Card/Card";
import { Badge } from "../../components/ui/Badge/Badge";
import { Button } from "../../components/ui/Button/Button";
import type { Task, TaskStatus } from "../../store/types";

const statusLabel: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

const priorityLabel = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const filters: { label: string; value: TaskStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "To do", value: "todo" },
  { label: "In progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

function TaskCard({
  task,
  onEdit,
}: {
  task: Task;
  onEdit: (task: Task) => void;
}) {
  const dispatch = useAppDispatch();

  return (
    <Card priority={task.priority === "high"}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="font-medium text-[#0f4c5c]">{task.title}</p>
          <p className="text-sm text-gray-400 mt-0.5">{task.description}</p>
          <div className="flex gap-2 mt-3">
            <Badge variant={task.status}>{statusLabel[task.status]}</Badge>
            <Badge variant={task.priority}>
              {priorityLabel[task.priority]}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          {task.status !== "done" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                dispatch(
                  changeStatus({
                    id: task.id,
                    status: task.status === "todo" ? "in_progress" : "done",
                  }),
                )
              }
            >
              {task.status === "todo" ? "Start" : "Complete"}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => dispatch(deleteTask(task.id))}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function TaskList({ onEdit }: { onEdit: (task: Task) => void }) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredTasks);
  const filter = useAppSelector((state) => state.tasks.filter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => dispatch(setFilter(f.value))}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${
                filter === f.value
                  ? "bg-[#5f0f40] text-white"
                  : "bg-white text-[#5f0f40] border border-[#5f0f40] hover:bg-[#f5e6ef]"
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <Card>
          <p className="text-center text-gray-400 py-8">No tasks found</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
