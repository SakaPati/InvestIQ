import { useMemo } from 'react';
// import billsIcon from '../../../img/6cd41e7077101a9235b02ac6e0c90201a98fb193.png';
// import ellipseIcon from '../../../img/Ellipse 1.png';
// import chartIcon from '../../../img/fb4edb649460d9fcce09db4a3b65362b599dd444.png';
import s from './SummarySection.module.css';

export type Transaction = {
  id: string;
  title: string;
  category: string;
  date: string | Date;
  sum: number | string;
};

type SummaryProps = {
  transactions?: readonly Transaction[];
  activeTab: string;
};

type DateParts = {
  year: number;
  monthIndex: number;
};

type NormalizedTransactionType = 'expenses' | 'income';
type SummaryRow = readonly [month: string, amount: string];

const MONTHS_UK = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const TAB_TYPE_MAP: Record<string, NormalizedTransactionType> = {
  expense: 'expenses',
  expenses: 'expenses',
  income: 'income',
  incomes: 'income',
};

const getTransactionDate = (transaction: Transaction) => transaction.date;
const getTransactionAmount = (transaction: Transaction) => transaction.sum;

const formatAmount = (amount: number) =>
  amount.toLocaleString('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const normalizeType = (type: unknown): NormalizedTransactionType | undefined =>
  TAB_TYPE_MAP[String(type || '').toLowerCase()];

const parseDateParts = (value: Transaction['date']): DateParts | null => {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    return {
      year: value.getFullYear(),
      monthIndex: value.getMonth(),
    };
  }

  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();
  const dotDateMatch = trimmedValue.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (dotDateMatch) {
    const [, day, month, year] = dotDateMatch;
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      return null;
    }

    return {
      year: date.getFullYear(),
      monthIndex: date.getMonth(),
    };
  }

  const isoDateMatch = trimmedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch;
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      return null;
    }

    return {
      year: date.getFullYear(),
      monthIndex: date.getMonth(),
    };
  }

  const date = new Date(trimmedValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    year: date.getFullYear(),
    monthIndex: date.getMonth(),
  };
};

const parseAmount = (value: Transaction['sum']): number | null => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const normalizedValue = value.trim().replace(/\s/g, '').replace(',', '.');
  const amount = Number(normalizedValue);

  return Number.isFinite(amount) ? amount : null;
};

const calculateSummaryRows = (
  transactions: SummaryProps['transactions'],
  activeTab: SummaryProps['activeTab'],
): SummaryRow[] => {
  const targetType = normalizeType(activeTab);

  if (!targetType || !Array.isArray(transactions)) {
    return [];
  }

  const currentYear = new Date().getFullYear();
  const monthlyTotals: number[] = Array(12).fill(0);
  let undatedTotal = 0;
  let hasDatedTransactions = false;

  transactions.forEach(transaction => {
    if (!transaction || typeof transaction !== 'object') {
      return;
    }

    const dateParse = parseDateParts(getTransactionDate(transaction));
    const amount = parseAmount(getTransactionAmount(transaction));

    if (amount === null) {
      return;
    }

    if (!dateParse) {
      undatedTotal += amount;
      return;
    }

    if (dateParse.year !== currentYear) {
      return;
    }

    hasDatedTransactions = true;
    monthlyTotals[dateParse.monthIndex] += amount;
  });

  const datedRows = monthlyTotals
    .map((amount, monthIndex) => ({
      month: MONTHS_UK[monthIndex],
      amount,
    }))
    .filter(({ amount }) => amount !== 0)
    .reverse()
    .map(({ month, amount }) => [month, formatAmount(amount)] as const);

  if (undatedTotal === 0) {
    return datedRows;
  }

  return [
    ...datedRows,
    [hasDatedTransactions ? 'Без дати' : 'Усього', formatAmount(undatedTotal)] as const,
  ];
};

export default function Summary({ transactions, activeTab }: SummaryProps) {
  const summaryRows = useMemo(
    () => calculateSummaryRows(transactions, activeTab),
    [transactions, activeTab],
  );

  return (
    <section className={s.section} aria-labelledby="summary-title">
      <div className={s.table} role="table" aria-label="Зведення операцій">
        <h2 className={s.title} id="summary-title">
          ЗВЕДЕННЯ
        </h2>

        <div className={s.body}>
          {summaryRows.length > 0 ? (
            summaryRows.map(([month, amount]) => (
              <div className={s.row} role="row" key={month}>
                <span className={s.month} role="cell">
                  {month}
                </span>
                <span className={s.amount} role="cell">
                  {amount}
                </span>
              </div>
            ))
          ) : (
            <div className={s.row} role="row">
              <span role="cell">За цей період операцій немає</span>
            </div>
          )}
        </div>
      </div>

      {/* <div className={s.decor} aria-hidden="true">
        <div className={s.iconGroup}>
          <img className={s.billsIcon} src={billsIcon} alt="" />
          <img className={s.chartIcon} src={chartIcon} alt="" />
        </div>
        <img className={`${s.ellipse} ${s.ellipseLeft}`} src={ellipseIcon} alt="" />
        <img className={`${s.ellipse} ${s.ellipseRight}`} src={ellipseIcon} alt="" />
      </div> */}
    </section>
  );
}
