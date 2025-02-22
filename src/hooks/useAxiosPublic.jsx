import axios from "axios";

// Server Live Link -- https://todoist-server-rouge.vercel.app

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
