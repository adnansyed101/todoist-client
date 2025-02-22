import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "../components/TaskColumn";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function MyTasks() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["allTasks", user?.uid],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task?fireId=${user?.uid}`);
      return data;
    },
  });

  const { mutateAsync: updateTaskStatus } = useMutation({
    mutationFn: ({ taskId, status }) => {
      return axiosPublic.patch(`/task/${taskId}`, { status });
    },
  });

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;

    const movedTask = tasks.find((task) => task._id === draggableId);

    movedTask.status = destination.droppableId;

    try {
      await updateTaskStatus({
        taskId: movedTask._id,
        status: destination.droppableId,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
