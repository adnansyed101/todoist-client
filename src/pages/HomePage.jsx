import { toast } from "react-toastify";
import DNDCols from "../components/DNDCols";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data, status, refetch } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task?fireId=${user?.uid}`);
      return data;
    },
    enabled: !!user && !!user?.uid,
  });

  const { mutate: createTask } = useMutation({
    mutationFn: (newTask) => axiosPublic.post("/task", newTask),
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (status === "success") {
      setTasks(data);
    }
  }, [status, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;

    const taskData = {
      title,
      description,
      status: "To Do",
      position: tasks.length + 1,
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
    <div className="py-20">
      <form onSubmit={handleSubmit} className="space-x-2 ml-2">
        <input
          type="text"
          name="title"
          className="input input-bordered input-primary"
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          className="input input-bordered input-primary"
          placeholder="Description"
        />
        <button className="btn btn-primary" type="submit">
          Add Task
        </button>
      </form>
      <DNDCols tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default HomePage;
