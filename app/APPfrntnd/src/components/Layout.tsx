import { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                {children}
            </div>
        </div>
    );
};

export default Layout;
