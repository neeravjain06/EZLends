import { useState } from "react";

const RiskDashboard = () => {
    const [stake, setStake] = useState<number | "">("");
    const [riskTier, setRiskTier] = useState("Medium");

    return (
        <div className="space-y-10">

            {/* Risk Capital Allocation */}
            <ModuleCard title="Risk Capital Allocation">
                <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                        label="Total Staked Capital"
                        value={stake}
                        onChange={(e: any) => setStake(Number(e.target.value))}
                        type="number"
                    />

                    <SelectField
                        label="Preferred Risk Tier"
                        value={riskTier}
                        options={["Low", "Medium", "High"]}
                        onChange={setRiskTier}
                    />

                    <StaticField label="Max Risk Exposure" value="30%" />
                    <StaticField label="Backing Strategy" value="Manual" />
                </div>
            </ModuleCard>

            {/* Risk Portfolio */}
            <ModuleCard title="Risk Portfolio">
                <StaticField label="Loans Backed" value="12" />
                <StaticField label="Average Risk Tier" value="Medium" />
                <StaticField label="Default Rate" value="6%" />
                <StaticField label="Premium Earned" value="$540" />
            </ModuleCard>

            {/* Reputation & Trust */}
            <ModuleCard title="Reputation & Trust">
                <StaticField label="Underwriter Score" value="87/100" />
                <StaticField label="Accuracy Rate" value="91%" />
                <StaticField label="Risk Multiplier Bonus" value="1.3x" />
                <StaticField label="Governance Power" value="4%" />
            </ModuleCard>

        </div>
    );
};

export default RiskDashboard;

/* Reusable Components */
const ModuleCard = ({ title, children }: any) => (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-purple-500">{title}</h3>
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
            className="w-full p-3 rounded-lg bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none"
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
