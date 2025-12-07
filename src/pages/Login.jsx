import { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
            Create An Account
          </h3>

          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spending by joining with us
          </p>

          <form className="space-y-4">
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
                  {error && (
                    <p className="text-red-800 text-sm text-center bg-red-100 p-2 rounded">
                      {error}
                    </p>
                  )}

                  <button
                    className="rounded-md bg-indigo-800 w-full py-3 text-lg font-medium text-white hover:bg-indigo-900 transition duration-300"
                    type="submit"
                  >
                    <Link to="/dashboard">
                      Login
                    </Link>
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
