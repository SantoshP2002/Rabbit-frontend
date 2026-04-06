import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slice/cartSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const redirect = redirectParam || "/";
  const isCheckOutRedirect = redirect?.includes("checkout");

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

    // VALIDATION
    if (!name || !email || !password) {
      toast.error("All fields are required ❗");
      return;
    }

    // email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter valid email ❗");
      return;
    }

    // password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters ❗");
      return;
    }

    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Registration Successful");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err || "Registration Fail");
      });
  };

  return (
    <div className="flex m-auto mb-5 max-w-7xl">
      {/* LEFT SIDE PAGE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 ">
        <form onSubmit={handelSubmit} className=" max-w-md">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit!</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋🏼</h2>
          <p className="text-center mb-6">
            Enter your Username & Password to Register!
          </p>
          {/* USERNAME */}
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2 ">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Enter Your Name..."
            />
          </div>
          {/* EMAIL */}
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2 ">Email</label>
            <input
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-300 outline-none transition-all duration-300 lowercase"
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
            disabled={!name || !email || !password}
            className={`w-full relative overflow-hidden border border-black p-2 rounded-lg font-semibold group ${
              !name || !email || !password
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              {loading ? "Loading..." : "Sign Up"}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-300 group-hover:h-full"></span>
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an Account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:block w-1/2">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y0/r/U45qBJmWVHU.webp"
            alt="register Image"
            className="h-[600px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
