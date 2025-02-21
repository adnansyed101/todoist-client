import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../components/Loading";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [showPwd, setShowPwd] = useState(false);
  const [showVerifyPwd, setShowVerifyPwd] = useState(false);
  const {
    user,
    createNewUser,
    setUser,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Todoist | Sign Up";
    window.scrollTo(0, 0);
  }, []);

  const handleShowPwd = () => setShowPwd(!showPwd);
  const handleShowVerifyPwd = () => setShowVerifyPwd(!showVerifyPwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const verifyPassword = form.verifyPassword.value;
    const image = form.image.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (password !== verifyPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(password) || !passwordRegex.test(verifyPassword)) {
      toast.warn("Must have 1 Uppercase, 1 Lowercase and atleast 6 character.");
      return;
    }

    setLoading(true);

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({
          displayName: name,
          photoURL: image,
        })
          .then(() => {
            axiosPublic.post(`/user/${user.uid}`, {
              name: user.displayName,
              image: image,
              email: email,
              fireId: user.uid,
            });
            toast.success("Account Created Successfully.");
            navigate("/");
            setLoading(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            toast.error(errorCode);
            setLoading(false);
            navigate("/signUp");
          });
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
        setLoading(false);
        navigate("/signUp");
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="signUpInPage">
      <div className="signUpInPanel">
        <h2 className="signUpInHeader">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Photo */}
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium mb-1"
            >
              Image URL:
            </label>
            <input
              required
              type="url"
              id="image"
              name="image"
              className="signInUpInput"
            />
          </div>
          {/* User Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="signInUpInput"
              required
            />
          </div>
          {/* Email Adress */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium  mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="signInUpInput"
              required
            />
          </div>
          {/* Enter Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium  mb-1"
            >
              Enter Password
            </label>
            <label className="signInUpInput flex items-center gap-2">
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                className="grow"
                autoComplete="off"
                required
              />
              {showPwd ? (
                <FaEyeSlash onClick={handleShowPwd} />
              ) : (
                <FaEye onClick={handleShowPwd} />
              )}
            </label>
            <ul className="text-sm list-disc pl-5 mt-2">
              <li>Must be atleast 6 characters long.</li>
              <li>Must contain one uppercase and one lowercase</li>
            </ul>
          </div>
          {/* Verify Password */}
          <div>
            <label
              htmlFor="verifyPassword"
              className="block text-sm font-medium mb-1"
            >
              Verify Password
            </label>
            <label className="signInUpInput  flex items-center gap-2">
              <input
                name="verifyPassword"
                type={showVerifyPwd ? "text" : "password"}
                className="grow"
                autoComplete="off"
                required
              />
              {showVerifyPwd ? (
                <FaEyeSlash onClick={handleShowVerifyPwd} />
              ) : (
                <FaEye onClick={handleShowVerifyPwd} />
              )}
            </label>
          </div>

          <p className="mt-2 text-sm">
            Already have an Account?{" "}
            <Link to="/signin" className="text-secondary">
              Sign In
            </Link>
          </p>
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
