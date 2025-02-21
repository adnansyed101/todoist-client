import { toast } from "react-toastify";
import DNDCols from "../components/DNDCols";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    axiosPublic
      .get(`/task?fireId=${user?.uid}`)
      .then((res) => setTasks(res.data));
  }, [axiosPublic, user]);

  const handleSubmit = async (e) => {
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
      await axiosPublic.post("/task", taskData);
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
