import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "../components/TaskColumn";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

export default function MyTasks() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: tasks = [] } = useQuery({
    queryKey: ["allTasks", user?.uid],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task?fireId=${user?.uid}`);
      return data;
    },
  });

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task.id === draggableId);
    movedTask.status = destination.droppableId;

    await axios.put(`http://localhost:5000/tasks/${movedTask.id}`, {
      status: movedTask.status,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-around p-5">
        {["To Do", "In Progress", "Done"].map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
