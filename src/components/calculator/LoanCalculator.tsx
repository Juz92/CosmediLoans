"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { calculateRepayment } from "@/lib/calculator";
import { procedures } from "@/data/procedures";
import { ArrowRight } from "lucide-react";

/* ── Helpers ────────────────────────────────────────────────────── */
function parseCostRange(range: string): [number, number] {
  const nums = range.match(/[\d,]+/g);
  if (!nums || nums.length < 2) return [1_000, 100_000];
  return [
    parseInt(nums[0].replace(/,/g, ""), 10),
    parseInt(nums[1].replace(/,/g, ""), 10),
  ];
}

function fmt(n: number): string {
  return n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function fmtCents(n: number): string {
  return n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ── Constants ──────────────────────────────────────────────────── */
const TERMS = [1, 2, 3, 5, 7] as const;
const MIN_RATE = 5.99;
const MAX_RATE = 15.99;
const DEFAULT_RATE = 7.99;
const BROKER_MAX = 9.99;
const ABS_MIN_AMOUNT = 1_000;
const ABS_MAX_AMOUNT = 100_000;

/* ── Procedure select options ───────────────────────────────────── */
const procedureOptions = procedures.map((p) => ({
  slug: p.slug,
  label: p.title,
  icon: p.icon,
  range: parseCostRange(p.avgCostRange),
}));

export function LoanCalculator() {
  /* ── State ──────────────────────────────────────────────────────── */
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [amount, setAmount] = useState(15_000);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [termYears, setTermYears] = useState<number>(3);

  /* ── Derived range from procedure ───────────────────────────────── */
  const [minAmount, maxAmount] = useMemo(() => {
    if (!selectedProcedure) return [ABS_MIN_AMOUNT, ABS_MAX_AMOUNT];
    const proc = procedureOptions.find((p) => p.slug === selectedProcedure);
    if (!proc) return [ABS_MIN_AMOUNT, ABS_MAX_AMOUNT];
    return [
      Math.max(ABS_MIN_AMOUNT, proc.range[0]),
      Math.min(ABS_MAX_AMOUNT, proc.range[1]),
    ];
  }, [selectedProcedure]);

  /* Clamp amount when procedure changes */
  const clampedAmount = Math.max(minAmount, Math.min(maxAmount, amount));

  /* ── Calculation ───────────────────────────────────────────────── */
  const result = useMemo(
    () => calculateRepayment(clampedAmount, rate, termYears),
    [clampedAmount, rate, termYears]
  );

  /* ── Handlers ──────────────────────────────────────────────────── */
  const handleProcedureChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const slug = e.target.value;
      setSelectedProcedure(slug);
      const proc = procedureOptions.find((p) => p.slug === slug);
      if (proc) {
        const mid = Math.round((proc.range[0] + proc.range[1]) / 2 / 1000) * 1000;
        setAmount(Math.max(proc.range[0], Math.min(proc.range[1], mid)));
      }
    },
    []
  );

  const handleAmountSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value)),
    []
  );

  const handleAmountInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      if (raw) setAmount(Number(raw));
    },
    []
  );

  const handleRateSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setRate(Number(e.target.value)),
    []
  );

  const handleRateInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");
      if (raw) setRate(Number(raw));
    },
    []
  );

  /* ── Rate slider gradient for broker vs bank zone ───────────── */
  const brokerPct = ((BROKER_MAX - MIN_RATE) / (MAX_RATE - MIN_RATE)) * 100;


  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* ── Left: Inputs (3 cols) ─────────────────────────────────── */}
      <div className="lg:col-span-3 space-y-8">
        {/* Procedure dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="calc-procedure"
            className="block text-sm font-semibold text-text-dark"
          >
            Procedure Type
          </label>
          <div className="relative">
            <select
              id="calc-procedure"
              value={selectedProcedure}
              onChange={handleProcedureChange}
              className="w-full px-4 py-3 pr-10 border border-border rounded-button bg-background text-text-dark focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all appearance-none"
            >
              <option value="">All procedures</option>
              {procedureOptions.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.icon} {p.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Loan amount */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="calc-amount"
              className="text-sm font-semibold text-text-dark"
            >
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                $
              </span>
              <input
                id="calc-amount-input"
                type="text"
                inputMode="numeric"
                value={clampedAmount.toLocaleString("en-AU")}
                onChange={handleAmountInput}
                onBlur={() =>
                  setAmount(Math.max(minAmount, Math.min(maxAmount, amount)))
                }
                className="w-32 pl-7 pr-3 py-1.5 border border-border rounded-button bg-background text-right text-sm font-semibold text-text-dark focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10"
                aria-label="Loan amount"
              />
            </div>
          </div>
          <input
            id="calc-amount"
            type="range"
            min={minAmount}
            max={maxAmount}
            step={500}
            value={clampedAmount}
            onChange={handleAmountSlider}
            className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
            aria-label="Loan amount slider"
          />
          <div className="flex justify-between text-xs text-text-muted">
            <span>{fmt(minAmount)}</span>
            <span>{fmt(maxAmount)}</span>
          </div>
        </div>

        {/* Interest rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="calc-rate"
              className="text-sm font-semibold text-text-dark"
            >
              Interest Rate (p.a.)
            </label>
            <div className="relative">
              <input
                id="calc-rate-input"
                type="text"
                inputMode="decimal"
                value={rate.toFixed(2)}
                onChange={handleRateInput}
                onBlur={() =>
                  setRate(
                    Math.max(MIN_RATE, Math.min(MAX_RATE, Math.round(rate * 100) / 100))
                  )
                }
                className="w-24 pr-7 pl-3 py-1.5 border border-border rounded-button bg-background text-right text-sm font-semibold text-text-dark focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10"
                aria-label="Interest rate"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                %
              </span>
            </div>
          </div>

          {/* Rate zone visual */}
          <div className="relative">
            <div className="absolute top-0 left-0 h-2 rounded-full overflow-hidden w-full">
              <div
                className="h-full bg-emerald-200"
                style={{ width: `${brokerPct}%` }}
              />
              <div
                className="absolute top-0 h-full bg-slate-200"
                style={{ left: `${brokerPct}%`, right: 0 }}
              />
            </div>
            <input
              id="calc-rate"
              type="range"
              min={MIN_RATE}
              max={MAX_RATE}
              step={0.1}
              value={rate}
              onChange={handleRateSlider}
              className="relative z-10 w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent"
              aria-label="Interest rate slider"
            />
          </div>
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="text-text-muted">
                Broker range ({MIN_RATE}%&ndash;{BROKER_MAX}%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="text-text-muted">
                Above broker ({(BROKER_MAX + 0.01).toFixed(2)}%&ndash;{MAX_RATE}%)
              </span>
            </div>
          </div>
          {rate <= BROKER_MAX && (
            <p className="text-xs text-emerald-600 font-medium">
              This rate is within the typical broker-matched range.
            </p>
          )}
        </div>

        {/* Loan term */}
        <div className="space-y-3">
          <span className="block text-sm font-semibold text-text-dark">
            Loan Term
          </span>
          <div className="flex gap-2 flex-wrap">
            {TERMS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTermYears(t)}
                className={`px-5 py-2.5 rounded-button text-sm font-semibold transition-all border ${
                  termYears === t
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-text-body border-border hover:border-primary-light hover:text-primary"
                }`}
                aria-pressed={termYears === t}
              >
                {t} {t === 1 ? "yr" : "yrs"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Results Card (2 cols) ──────────────────────────── */}
      <div className="lg:col-span-2">
        <Card className="sticky top-28 bg-gradient-to-br from-primary to-primary-deep text-white !shadow-form">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-white/70 font-medium mb-1">
                Estimated Monthly Repayment
              </p>
              <p className="text-5xl font-bold tracking-tight">
                {fmtCents(result.monthlyPayment)}
              </p>
              <p className="text-sm text-white/60 mt-1">per month</p>
            </div>

            <div className="h-px bg-white/20" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/70 mb-0.5">Total Repayment</p>
                <p className="text-lg font-bold">{fmtCents(result.totalRepayment)}</p>
              </div>
              <div>
                <p className="text-sm text-white/70 mb-0.5">Total Interest</p>
                <p className="text-lg font-bold">{fmtCents(result.totalInterest)}</p>
              </div>
            </div>

            <div className="h-px bg-white/20" />

            <div className="space-y-2 text-sm text-white/80">
              <div className="flex justify-between">
                <span>Loan Amount</span>
                <span className="font-semibold text-white">
                  {fmt(clampedAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Interest Rate</span>
                <span className="font-semibold text-white">
                  {rate.toFixed(2)}% p.a.
                </span>
              </div>
              <div className="flex justify-between">
                <span>Loan Term</span>
                <span className="font-semibold text-white">
                  {termYears} {termYears === 1 ? "year" : "years"} ({termYears * 12}{" "}
                  payments)
                </span>
              </div>
            </div>

            <Button
              as={Link}
              href="/apply"
              size="lg"
              variant="secondary"
              className="w-full bg-white text-primary hover:bg-primary-wash justify-center"
            >
              Get This Rate
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>

            <p className="text-[11px] text-white/50 leading-snug text-center">
              Estimates are indicative only. Your actual rate depends on your
              credit profile, lender, and loan details.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
