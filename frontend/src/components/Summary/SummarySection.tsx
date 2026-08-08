import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  selectTotalExpenseSum,
  selectTotalIncomeSum,
  type Month,
  type SumByPeriod,
  type Years,
} from '../../redux/selectors/transaction_selectors';
import s from './SummarySection.module.css';

type SummaryRow = readonly [month: string, amount: string];

const MONTH_LABELS: Record<Month, string> = {
  January: 'Січень',
  February: 'Лютий',
  March: 'Березень',
  April: 'Квітень',
  May: 'Травень',
  June: 'Червень',
  July: 'Липень',
  August: 'Серпень',
  September: 'Вересень',
  October: 'Жовтень',
  November: 'Листопад',
  December: 'Грудень',
};

const months = Object.keys(MONTH_LABELS) as Month[];

const formatAmount = (amount: number) =>
  amount.toLocaleString('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const isKnownYear = (year: number): year is Years =>
  year >= 2020 && year <= 2030;

const getSummaryRows = (sumByPeriod: SumByPeriod): SummaryRow[] => {
  const now = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - index,
      1,
    );

    const year = date.getFullYear();
    const month = months[date.getMonth()];

    if (!isKnownYear(year)) {
      return [`${MONTH_LABELS[month]} ${year}`, formatAmount(0)] as const;
    }

    const amount = sumByPeriod[year][month].sum;

    return [`${MONTH_LABELS[month]} ${year}`, formatAmount(amount)] as const;
  });
};

export default function Summary({ activeCategory }: any) {
  const expenseSummary = useSelector(selectTotalExpenseSum);
  const incomesSummary = useSelector(selectTotalIncomeSum);

  const summary = activeCategory === "Витрати" ? expenseSummary : incomesSummary;
  const summaryRows = useMemo(
    () => getSummaryRows(summary),
    [summary],
  );

  return (
    <section className={s.section} aria-labelledby="summary-title">
      <div className={s.table} role="table" aria-label="Зведення операцій">
        <h2 className={s.title} id="summary-title">
          ЗВЕДЕННЯ
        </h2>

        <div className={s.body}>
          {summaryRows.map(([month, amount]) => (
            <div className={s.row} role="row" key={month}>
              <span className={s.month} role="cell">
                {month}
              </span>
              <span className={s.amount} role="cell">
                {amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}