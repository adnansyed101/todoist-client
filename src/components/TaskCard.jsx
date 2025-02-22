import { Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import PropTypes from "prop-types";

export default function TaskCard({ task, index }) {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/tasks/${task.id}`);
  };

  const handleUpdate = async () => {
    const newTitle = prompt("Enter new title:", task.title);
    if (!newTitle) return;

    await axios.put(`http://localhost:5000/tasks/${task.id}`, {
      title: newTitle,
    });
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
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Update
            </button>
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
