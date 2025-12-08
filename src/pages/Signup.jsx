import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/uploadProfileImage";

const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileUrl = "";
    setIsLoading(true);

    //basic Validation
    if (!fullname.trim()) {
      setError("Please Enter Your FullName");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please Enter A Valid Email");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please Enter Your Password");
      return;
    }

    console.log(fullname, email, password);

    setError("");

    //signup api call
    try {
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";
      }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullname,
        email,
        password,
        profileImageUrl
      });
      if (response.status === 201) {
        toast.success("Profile Craeted Succesfully");
        navigate("/login");
      }
    } catch (err) {
      console.log("Something went wrong", err);
      toast.error("Signup Failed. Please try again");
      const error = err.response?.data || { message: "Signup Failed" };
      setError(err.message);
      console.log(error);
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
            Create An Account
          </h3>

          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spending by joining with us
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              {/* Profile Image */}
              <ProfilePhotoSelector
                image={profilePhoto}
                setImage={setProfilePhoto}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="Jhon Doe"
                type="text"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="name@example.com"
                type="text"
              />
              <div className="col-span-2">
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
                    className={`btn-primary bg-indigo-800 rounded-md w-full py-3 text-lg font-medium flex justify-center items-center gap-2 ${
                      isLoading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle className="animate-spin w-5 h-5" />
                        Signing Up...
                      </>
                    ) : (
                      "SIGN UP"
                    )}
                  </button>
                  <p className="text-sm text-slate-800 text-center mt-6 gap-2 flex justify-center items-center">
                    Already have an account?
                    <Link
                      to="/login"
                      className="font-medium text-primary underline hover:text-primary-dark transition-colors"
                    >
                      Login
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

export default Signup;
