import { useState } from "react";
import Column from "../components/Column";
import { closestCorners, DndContext } from "@dnd-kit/core";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

const HomePage = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;

    console.log(title, description);
  };

  return (
    <div className="py-20">
      <form onSubmit={handleSubmit} className="space-x-2 ml-2">
        <input
          type="text"
          name="title"
          className="input input-bordered input-primary"
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          className="input input-bordered input-primary"
          placeholder="Description"
        />
        <button className="btn btn-primary" type="submit">Add Task</button>
      </form>

      <div className="p-4">
        <div className="flex gap-8">
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            {COLUMNS.map((column) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((task) => task.status === column.id)}
                />
              );
            })}
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
