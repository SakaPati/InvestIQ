import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  selectTotalExpenseSum,
  type Month,
  type SumByPeriod,
  type Years,
} from '../../redux/selectors/transaction_selectors';
import styles from './SummarySection.module.css';

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

export default function Summary() {
  const expenseSummary = useSelector(selectTotalExpenseSum);

  const summaryRows = useMemo(
    () => getSummaryRows(expenseSummary),
    [expenseSummary],
  );

  return (
    <section className={styles.section} aria-labelledby="summary-title">
      <div className={styles.table} role="table" aria-label="Зведення операцій">
        <h2 className={styles.title} id="summary-title">
          ЗВЕДЕННЯ
        </h2>

        <div className={styles.body}>
          {summaryRows.map(([month, amount]) => (
            <div className={styles.row} role="row" key={month}>
              <span className={styles.month} role="cell">
                {month}
              </span>
              <span className={styles.amount} role="cell">
                {amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}