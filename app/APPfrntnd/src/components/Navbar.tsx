import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null; // Hide navbar if not logged in

    return (
        <div className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center">

            {/* Left Side */}
            <div
                onClick={() => navigate("/dashboard")}
                className="text-xl font-bold cursor-pointer text-blue-500"
            >
                EZLend
            </div>

            {/* Right Side */}
            <div className="flex gap-6 items-center">
                <button
                    onClick={() => navigate("/marketplace")}
                    className="hover:text-blue-400 transition"
                >
                    Marketplace
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="hover:text-blue-400 transition"
                >
                    Dashboard
                </button>

                <button
                    onClick={logout}
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
