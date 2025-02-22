import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import PropTypes from "prop-types";

export default function TaskColumn({ status, tasks }) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-1/3 bg-gray-100 p-4 rounded shadow-md"
        >
          <h2 className="text-xl font-bold mb-3">{status}</h2>
          {tasks.map((task, index) => (
            <TaskCard key={task._id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

TaskColumn.propTypes = {
  status: PropTypes.string,
  tasks: PropTypes.number,
};
