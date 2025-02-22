import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Stay Focused, Get Things Done</h1>
          <p className="py-6">
            A simple way to plan, track, and complete your tasks.
          </p>
          <Link to={"/dashboard/addTask"} className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
