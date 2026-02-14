import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"borrower" | "lender" | "risk">("borrower");

    const handleSubmit = () => {
        login({ name, email, role });
        navigate("/dashboard");
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-md shadow-xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Create Account
                    </h2>

                    <input
                        className="w-full mb-4 p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="w-full mb-4 p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <select
                        className="w-full mb-6 p-3 rounded-lg bg-gray-800"
                        onChange={(e) => setRole(e.target.value as any)}
                    >
                        <option value="borrower">Borrower</option>
                        <option value="lender">Lender</option>
                        <option value="risk">Risk Undertaker</option>
                    </select>

                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
