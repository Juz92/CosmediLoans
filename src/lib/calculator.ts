export interface AmortisationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface CalculationResult {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  schedule: AmortisationRow[];
}

export function calculateRepayment(
  principal: number,
  annualRate: number,
  termYears: number
): CalculationResult {
  if (principal <= 0 || termYears <= 0 || annualRate < 0) {
    return { monthlyPayment: 0, totalRepayment: 0, totalInterest: 0, schedule: [] };
  }

  const numPayments = Math.round(termYears * 12);

  // Handle 0% interest rate
  if (annualRate === 0) {
    const monthlyPayment = principal / numPayments;
    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalRepayment: principal,
      totalInterest: 0,
      schedule: Array.from({ length: numPayments }, (_, i) => ({
        month: i + 1,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(monthlyPayment * 100) / 100,
        interest: 0,
        balance: Math.round((principal - monthlyPayment * (i + 1)) * 100) / 100,
      })),
    };
  }

  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment =
    principal *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const schedule: AmortisationRow[] = [];
  let balance = principal;

  for (let i = 1; i <= numPayments; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance -= principalPaid;

    schedule.push({
      month: i,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100),
    });
  }

  const totalRepayment = monthlyPayment * numPayments;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    totalInterest: Math.round((totalRepayment - principal) * 100) / 100,
    schedule,
  };
}
