import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

export default function AddTask() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: createTask } = useMutation({
    mutationFn: (newTask) => axiosPublic.post("/task", newTask),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allTasks"] }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;

    const taskData = {
      title,
      description,
      status: "To Do",

      fireId: user.uid,
    };

    try {
      createTask(taskData);
      toast.success("Task Created");
    } catch (err) {
      toast.err(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-3">Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          className="p-2 border rounded w-full mb-2"
        />
        <textarea
          placeholder="Task Description"
          className="p-2 border rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
