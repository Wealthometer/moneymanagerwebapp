import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please Enter A Valid Email");
      // setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please Enter Your Password");
      return;
    }

    console.log(email, password);

    setError("");

    //login api call
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
      if (response.status === 200) {
        toast.success("Login Succesful");
        // navigate("/dashboard");
      }
    } catch (err) {
      console.log("Something went wrong", err);
      toast.error("Login Failed. Please try again");
      const error = err.response?.data || { message: "Login Failed" };
      setError(err.message);

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error("Login error:", error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background  Image with blur */}
      <img
        src={assets.login_bg}
        alt="Backgroung-Img"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>

          <p className="text-sm text-slate-700 text-center mb-8">
            Log in to continue tracking your spending
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              {/* Profile Image */}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  placeholder="name@example.com"
                  type="text"
                />

                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="********"
                  type="password"
                />

                <div>
                  <div className="my-2.5">
                    {error && (
                      <p className="text-red-800 text-sm text-center bg-red-100 p-2 rounded">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    disabled={isLoading}
                    className={`rounded-md bg-indigo-800 w-full py-3 text-lg font-medium text-white hover:bg-indigo-900 transition duration-300 flex justify-center items-center ${
                      isLoading ? "cursor-not-allowed opacity-60" : ""
                    }`}
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle className="animate-spin w-5 h-5" />
                        "Logging In..."
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                  <p className="text-sm text-slate-800 text-center mt-6 gap-2 flex justify-center items-center">
                    Don't have an account ?
                    <Link
                      to="/signup"
                      className="font-medium text-primary underline hover:text-primary-dark transition-colors"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
