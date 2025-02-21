import Column from "../components/Column";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const DNDCols = ({ tasks, setTasks }) => {
  const axiosPublic = useAxiosPublic();
  const columns = ["To Do", "In Progress", "Done"];

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    // Find the dragged task
    const draggedTask = tasks.find((task) => task._id === active.id);

    // If moved to a new column, update status
    if (draggedTask.status !== over.id) {
      draggedTask.status = over.id;
    }

    // Rearrange tasks locally
    const updatedTasks = arrayMove(
      tasks,
      tasks.findIndex((t) => t._id === active.id),
      tasks.findIndex((t) => t._id === over.id)
    );

    setTasks(updatedTasks);

    try {
      // Send update request to backend
      await axiosPublic.put(`/task/${draggedTask._id}`, {
        status: draggedTask.status,
        position: tasks.findIndex((t) => t._id === active.id),
      });
    } catch (err) {
      toast.err(err.message);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => {
            return (
              <Column
                key={column}
                column={column}
                tasks={tasks.filter((task) => task.status === column)}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};

DNDCols.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
};

export default DNDCols;
