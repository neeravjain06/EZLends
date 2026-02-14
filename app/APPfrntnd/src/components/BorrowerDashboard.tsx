import { useState } from "react";
import { calculateRiskScore } from "../services/riskEngine";
import { useLoans } from "../context/LoanContext";

const BorrowerDashboard = () => {
    const { addLoan } = useLoans();

    // Loan details
    const [loanAmount, setLoanAmount] = useState<number | "">("");
    const [duration, setDuration] = useState("30");
    const [purpose, setPurpose] = useState("Business");

    // Risk input parameters
    const [income, setIncome] = useState<number>(0);
    const [expenses, setExpenses] = useState<number>(0);
    const [pastDefaults, setPastDefaults] = useState<number>(0);
    const [repaymentHistory, setRepaymentHistory] = useState<number>(80);

    // Live risk score
    const riskScore = calculateRiskScore({
        income,
        expenses,
        pastDefaults,
        repaymentHistory,
    });

    // Derived financial metrics
    const defaultProbability = (1000 - riskScore) / 1000;
    const baseRate = 8;
    const riskPremium = defaultProbability * 20;
    const estimatedAPR = (baseRate + riskPremium).toFixed(2);
    const underwriterCoverage = (defaultProbability * 100).toFixed(0);

    const riskTier =
        riskScore >= 800
            ? "Low"
            : riskScore >= 600
                ? "Medium"
                : riskScore >= 400
                    ? "High"
                    : "Very High";

    const handleSubmitLoan = () => {
        if (!loanAmount || Number(loanAmount) <= 0) {
            alert("Please enter a valid loan amount.");
            return;
        }

        addLoan({
            id: Date.now(),
            amount: Number(loanAmount),
            duration,
            purpose,
            riskScore,
            apr: Number(estimatedAPR),
        });

        alert("Loan Request Submitted!");

        // Reset loan amount
        setLoanAmount("");
    };

    return (
        <div className="space-y-10">

            {/* Loan Request Module */}
            <ModuleCard title="Loan Request Module">
                <div className="grid md:grid-cols-2 gap-6">

                    <InputField
                        label="Loan Amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        type="number"
                    />

                    <SelectField
                        label="Loan Duration"
                        value={duration}
                        options={["30", "60", "90", "180"]}
                        onChange={setDuration}
                    />

                    <SelectField
                        label="Purpose Category"
                        value={purpose}
                        options={["Business", "Education", "Personal"]}
                        onChange={setPurpose}
                    />

                    <StaticField label="Risk Tier" value={riskTier} />
                    <StaticField label="Estimated APR" value={`${estimatedAPR}%`} />
                    <StaticField
                        label="Underwriter Coverage Required"
                        value={`${underwriterCoverage}%`}
                    />

                    <button
                        onClick={handleSubmitLoan}
                        className="col-span-2 bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition mt-4"
                    >
                        Submit Loan Request
                    </button>

                </div>
            </ModuleCard>

            {/* Risk Input Parameters */}
            <ModuleCard title="Risk Evaluation Inputs">
                <div className="grid md:grid-cols-2 gap-6">

                    <InputField
                        label="Monthly Income"
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                    />

                    <InputField
                        label="Monthly Expenses"
                        type="number"
                        value={expenses}
                        onChange={(e) => setExpenses(Number(e.target.value))}
                    />

                    <InputField
                        label="Past Defaults"
                        type="number"
                        value={pastDefaults}
                        onChange={(e) => setPastDefaults(Number(e.target.value))}
                    />

                    <InputField
                        label="Repayment History %"
                        type="number"
                        value={repaymentHistory}
                        onChange={(e) => setRepaymentHistory(Number(e.target.value))}
                    />

                    <StaticField label="Live Risk Score" value={riskScore} />

                </div>
            </ModuleCard>

            {/* Credit Overview */}
            <ModuleCard title="Credit & Trust Overview">
                <StaticField label="Current Risk Score" value={riskScore} />
                <StaticField label="Trust Level" value={riskTier} />
                <StaticField
                    label="Default Probability"
                    value={`${(defaultProbability * 100).toFixed(1)}%`}
                />
            </ModuleCard>

        </div>
    );
};

export default BorrowerDashboard;


/* ---------------- REUSABLE COMPONENTS ---------------- */

type ModuleCardProps = {
    title: string;
    children: React.ReactNode;
};

const ModuleCard = ({ title, children }: ModuleCardProps) => (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-blue-500">{title}</h3>
        {children}
    </div>
);

type InputFieldProps = {
    label: string;
    value: number | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
};

const InputField = ({ label, value, onChange, type }: InputFieldProps) => (
    <div>
        <label className="block mb-2 text-gray-400">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full p-3 rounded-lg bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
    </div>
);

type SelectFieldProps = {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
};

const SelectField = ({
                         label,
                         value,
                         options,
                         onChange,
                     }: SelectFieldProps) => (
    <div>
        <label className="block mb-2 text-gray-400">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800"
        >
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);

type StaticFieldProps = {
    label: string;
    value: number | string;
};

const StaticField = ({ label, value }: StaticFieldProps) => (
    <div className="mb-4">
        <p className="text-gray-400">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
    </div>
);
