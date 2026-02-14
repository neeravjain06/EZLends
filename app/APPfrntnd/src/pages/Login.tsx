import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleLogin = () => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("No account found. Please register.");
            navigate("/register");
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.email === email) {
            login(user);
            navigate("/dashboard");
        } else {
            alert("Email not found. Please register.");
            navigate("/register");
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-md shadow-xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Welcome Back
                    </h2>

                    <input
                        className="w-full mb-6 p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition mb-4"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-400 text-sm">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-500 cursor-pointer hover:underline"
                        >
              Register here
            </span>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
