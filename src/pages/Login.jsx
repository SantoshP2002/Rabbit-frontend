import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slice/cartSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckOutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckOutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckOutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckOutRedirect, dispatch]);

  const handelSubmit = (e) => {
    e.preventDefault();

    // email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter valid email and Password");
      return;
    }

    // password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters ❗");
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login Success");
        navigate("/");
      })
      .catch((err) => toast.error(err || "User Not Found", { duration: 2000 }));
  };

  return (
    <div className="flex m-auto mb-5 max-w-7xl">
      {/* LEFT SIDE PAGE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handelSubmit} className=" ">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit!</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋🏼</h2>
          <p className="text-center mb-6">
            Enter your Email & Password to Login!
          </p>
          {/* EMAIL */}
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2 ">Email</label>
            <input
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Enter Your Email..."
            />
          </div>
          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 ">
              Password
            </label>
            <input
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Enter Your Password..."
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full relative overflow-hidden border border-black bg-white text-black p-2 rounded-lg font-semibold group"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              {loading ? "Loading..." : "Sign In"}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-300 group-hover:h-full"></span>
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an Account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:block w-1/2">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/9z3jqxP6hAH.png"
            alt="Login Image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
