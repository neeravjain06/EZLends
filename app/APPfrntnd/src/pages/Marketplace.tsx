import Layout from "../components/Layout";
import { useLoans } from "../context/LoanContext";
import { useState } from "react";

const Marketplace = () => {
    const { loans } = useLoans();

    const [minRisk, setMinRisk] = useState<number>(0);
    const [maxAPR, setMaxAPR] = useState<number>(100);
    const [durationFilter, setDurationFilter] = useState<string>("All");
    const [purposeFilter, setPurposeFilter] = useState<string>("All");

    const filteredLoans = loans.filter((loan) => {
        return (
            loan.riskScore >= minRisk &&
            loan.apr <= maxAPR &&
            (durationFilter === "All" || loan.duration === durationFilter) &&
            (purposeFilter === "All" || loan.purpose === purposeFilter)
        );
    });

    return (
        <Layout>
            <h2 className="text-3xl font-bold mb-8">Loan Marketplace</h2>

            {/* FILTER PANEL */}
            <div className="bg-gray-900 p-6 rounded-2xl mb-8 grid md:grid-cols-4 gap-6">

                <div>
                    <label className="block text-gray-400 mb-2">
                        Minimum Risk Score
                    </label>
                    <input
                        type="number"
                        value={minRisk}
                        onChange={(e) => setMinRisk(Number(e.target.value))}
                        className="w-full p-2 bg-gray-800 rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Maximum APR %
                    </label>
                    <input
                        type="number"
                        value={maxAPR}
                        onChange={(e) => setMaxAPR(Number(e.target.value))}
                        className="w-full p-2 bg-gray-800 rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Duration
                    </label>
                    <select
                        value={durationFilter}
                        onChange={(e) => setDurationFilter(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded"
                    >
                        <option>All</option>
                        <option>30</option>
                        <option>60</option>
                        <option>90</option>
                        <option>180</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Purpose
                    </label>
                    <select
                        value={purposeFilter}
                        onChange={(e) => setPurposeFilter(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded"
                    >
                        <option>All</option>
                        <option>Business</option>
                        <option>Education</option>
                        <option>Personal</option>
                    </select>
                </div>

            </div>

            {/* LOAN CARDS */}
            <div className="grid md:grid-cols-3 gap-6">
                {filteredLoans.map((loan) => (
                    <div
                        key={loan.id}
                        className="bg-gray-900 p-6 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-xl font-bold mb-2">
                            ${loan.amount}
                        </h3>

                        <p>Risk Score: {loan.riskScore}</p>
                        <p>APR: {loan.apr}%</p>
                        <p>Duration: {loan.duration} days</p>
                        <p>Purpose: {loan.purpose}</p>

                        <button className="mt-4 w-full bg-green-600 py-2 rounded hover:bg-green-700">
                            Fund Loan
                        </button>
                    </div>
                ))}
            </div>

            {filteredLoans.length === 0 && (
                <p className="text-gray-500 mt-10">
                    No loans match your filters.
                </p>
            )}
        </Layout>
    );
};

export default Marketplace;
