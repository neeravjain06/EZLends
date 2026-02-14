import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
                <h1 className="text-6xl font-bold mb-6">
                    EZ<span className="text-blue-500">Lend</span>
                </h1>

                <p className="text-gray-400 text-lg mb-10">
                    Decentralized Micro Lending Platform
                </p>

                <div className="flex gap-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-8 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="px-8 py-3 bg-green-600 rounded-xl hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Landing;
