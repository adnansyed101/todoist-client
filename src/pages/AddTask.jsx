import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: createTask } = useMutation({
    mutationFn: (newTask) => axiosPublic.post("/task", newTask),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allTasks"] }),
  });

  const handleSubmit = async (e) => {
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
      await createTask(taskData);
      toast.success("Task Created");
      navigate("/dashboard/myTask");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-3">Add a New Task</h2>
      <div className="card bg-base-200 w-1/2 shrink-0 shadow-2xl border">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="title"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Description</span>
            </label>
            <textarea
              className="input input-bordered w-full"
              name="description"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
