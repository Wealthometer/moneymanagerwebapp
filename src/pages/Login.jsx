import { assets } from "../assets/assets";

const Login = () => {
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background  Image with blur */}
      <img
        src={assets.login_bg}
        alt="Backgroung-Img"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />
    </div>
  );
};

export default Login;
