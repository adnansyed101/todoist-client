import { Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function TaskCard({ task, index }) {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: (taskId) => {
      return axiosPublic.delete(`/task/${taskId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allTasks"] }),
  });

  const handleDelete = async () => {
    await deleteTask(task._id);
    toast.warn("Task Deleted.");
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-3 my-2 bg-white shadow-md rounded cursor-grab"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="flex justify-between mt-2">
            <Link
              to={`/dashboard/updateTask/${task._id}`}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Update
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
};
