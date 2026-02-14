
import LenderDashboard from "../components/LenderDashboard";
import RiskDashboard from "../components/RiskDashboard";

import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import BorrowerDashboard from "../components/BorrowerDashboard";

const Dashboard = () => {
    const { user, logout } = useAuth();

    if (!user) return <h2>Please Login</h2>;

    return (
        <Layout>
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold">
                    {user.role.toUpperCase()} DASHBOARD
                </h2>

                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
            </div>

            <div>
                {user.role === "borrower" && <BorrowerDashboard />}

                {user.role === "lender" && <LenderDashboard />}
                {user.role === "risk" && <RiskDashboard />}


            </div>
        </Layout>
    );
};



export default Dashboard;
