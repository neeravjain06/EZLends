export const calculateRiskScore = (params: {
    income: number;
    expenses: number;
    pastDefaults: number;
    repaymentHistory: number;
}) => {
    let score = 500;

    score += params.income / 100;
    score -= params.expenses / 100;
    score -= params.pastDefaults * 50;
    score += params.repaymentHistory * 2;

    if (score > 1000) score = 1000;
    if (score < 0) score = 0;

    return Math.round(score);
};
