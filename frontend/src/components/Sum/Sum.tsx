import { useSelector } from "react-redux";
import s from "./Sum.module.css";
import {
  selectTotalExpenseSum,
  selectTotalIncomeSum,
  type SumByPeriod,
} from "@/redux/selectors/transaction_selectors";
import { selectMonth, selectYear } from "@/redux/slices/monthSlice";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function Sum() {
  const expenseSum: SumByPeriod = useSelector(selectTotalExpenseSum);
  const incomeSum: SumByPeriod = useSelector(selectTotalIncomeSum);

  const year = useSelector(selectYear)
  const currentMonth = useSelector(selectMonth)

  const month = months[currentMonth]

  return (
    <section className={s.section}>
      <ul className={s.list}>
        <li className={`${s.item} ${s.first}`}>
          <p className={s.category}>Доходи:</p>
          <span className={`${s.expense} ${s.sum}`}>+ {incomeSum[year][month].sum} грн.</span>
        </li>
        <li className={s.item}>
          <p className={s.category}>Витрати:</p>
          <span className={`${s.income} ${s.sum}`}>- {expenseSum[year][month].sum} грн.</span>
        </li>
      </ul>
    </section>
  );
}
