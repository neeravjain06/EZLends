import { useState } from "react";

const LenderDashboard = () => {
    const [capital, setCapital] = useState<number | "">("");
    const [riskTolerance, setRiskTolerance] = useState("Medium");

    return (
        <div className="space-y-10">

            {/* Capital & Risk Preferences */}
            <ModuleCard title="Capital & Risk Preferences">
                <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                        label="Available Capital"
                        value={capital}
                        onChange={(e: any) => setCapital(Number(e.target.value))}
                        type="number"
                    />

                    <SelectField
                        label="Risk Tolerance"
                        value={riskTolerance}
                        options={["Low", "Medium", "High"]}
                        onChange={setRiskTolerance}
                    />

                    <StaticField label="Max Allocation Per Loan" value="$1,000" />
                    <StaticField label="Preferred Duration" value="60 Days" />
                    <StaticField label="Auto Diversification" value="Enabled" />
                </div>
            </ModuleCard>

            {/* Portfolio Overview */}
            <ModuleCard title="Portfolio Overview">
                <StaticField label="Total Invested" value="$4,200" />
                <StaticField label="Active Loans" value="7" />
                <StaticField label="Average APR" value="16%" />
                <StaticField label="Expected Monthly Yield" value="$180" />
                <StaticField label="Default Exposure" value="4%" />
            </ModuleCard>

            {/* Earnings & Performance */}
            <ModuleCard title="Earnings & Performance">
                <StaticField label="Total Earned" value="$920" />
                <StaticField label="Pending Interest" value="$120" />
                <StaticField label="Realized Yield" value="14%" />
                <StaticField label="Portfolio Growth Trend" value="📈 Stable Growth" />
            </ModuleCard>

        </div>
    );
};

export default LenderDashboard;

/* Reusable Components */
const ModuleCard = ({ title, children }: any) => (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-green-500">{title}</h3>
        {children}
    </div>
);

const InputField = ({ label, value, onChange, type }: any) => (
    <div>
        <label className="block mb-2 text-gray-400">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full p-3 rounded-lg bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
        />
    </div>
);

const SelectField = ({ label, value, options, onChange }: any) => (
    <div>
        <label className="block mb-2 text-gray-400">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800"
        >
            {options.map((opt: string) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);

const StaticField = ({ label, value }: any) => (
    <div className="mb-4">
        <p className="text-gray-400">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
    </div>
);
