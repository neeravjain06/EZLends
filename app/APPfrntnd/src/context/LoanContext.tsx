import { createContext, useContext, useState, ReactNode } from "react";

export interface Loan {
    id: number;
    amount: number;
    duration: string;
    purpose: string;
    riskScore: number;
    apr: number;
}

interface LoanContextType {
    loans: Loan[];
    addLoan: (loan: Loan) => void;
}

const LoanContext = createContext<LoanContextType | null>(null);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
    const [loans, setLoans] = useState<Loan[]>([]);

    const addLoan = (loan: Loan) => {
        setLoans((prev) => [...prev, loan]);
    };

    return (
        <LoanContext.Provider value={{ loans, addLoan }}>
            {children}
        </LoanContext.Provider>
    );
};

export const useLoans = () => {
    const context = useContext(LoanContext);
    if (!context) throw new Error("Must be used inside LoanProvider");
    return context;
};
