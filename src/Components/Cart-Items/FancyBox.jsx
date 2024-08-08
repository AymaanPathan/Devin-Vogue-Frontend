// FancyBox.js
import { useNavigate } from "react-router-dom";

function FancyBox() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 select-none bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div
        className={`bg-white shadow-2xl  border   p-6 md:p-8 rounded-lg  text-center transform transition-all duration-300 w-full max-w-md `}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Oops!</h2>
        <p className="mb-4 md:mb-6 text-gray-700">
          Log in or sign up to access your shopping cart.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white hover:bg-red-900 hover:text-white duration-300 text-black py-2 px-6 rounded-md shadow-md transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-white hover:bg-red-900 hover:text-white duration-300 py-2 px-6 rounded-md shadow-md transition-colors"
          >
            Home Page
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-white hover:bg-red-900 hover:text-white duration-300 py-2 px-6 rounded-md shadow-md transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default FancyBox;
