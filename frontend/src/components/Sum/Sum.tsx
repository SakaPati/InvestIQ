import { useSelector } from "react-redux";
import s from "./Sum.module.css";
import {
  selectTotalExpenseSum,
  selectTotalIncomeSum,
  type ReturnedData,
} from "@/redux/transaction_selectors";

export function Sum() {
  const expenseSum: ReturnedData = useSelector(selectTotalExpenseSum);
  const incomeSum: ReturnedData = useSelector(selectTotalIncomeSum);

  return (
    <section className={s.section}>
      <ul className={s.list}>
        <li className={`${s.item} ${s.first}`}>
          <p className={s.category}>Доходи:</p>
          <span className={`${s.expense} ${s.sum}`}>+ {incomeSum.sum} грн.</span>
        </li>
        <li className={s.item}>
          <p className={s.category}>Витрати:</p>
          <span className={`${s.income} ${s.sum}`}>- {expenseSum.sum} грн.</span>
        </li>
      </ul>
    </section>
  );
}
