import { toast } from "react-toastify";
import Loading from "../components/Loading";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

const UpdateTask = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { taskId } = useParams();

  const { data: task = {}, isLoading } = useQuery({
    queryKey: ["singleTask"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task/${taskId}`);
      return data;
    },
  });

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: (newTask) =>
      axiosPublic.patch(`/task/update/${taskId}`, newTask),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;

    const taskData = {
      title,
      description,
    };

    try {
      await updateTask(taskData);
      toast.success("Task Updated");
      navigate("/dashboard/myTask");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-3">Update Task</h2>
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
              defaultValue={task.title}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Description</span>
            </label>
            <textarea
              className="input input-bordered w-full"
              name="description"
              defaultValue={task.description}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
