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
      toast.err(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-3">Update Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          className="p-2 border rounded w-full mb-2"
          name="title"
          defaultValue={task.title}
        />
        <textarea
          placeholder="Task Description"
          className="p-2 border rounded w-full mb-2"
          name="description"
          defaultValue={task.description}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
