import s from "./Transactions.module.css";
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { nanoid } from "@reduxjs/toolkit";
import { GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  addIncome,
  expenseSelectors,
  incomeSelectors,
  removeExpense,
  removeIncome,
  type Transaction,
} from "@/redux/slices/transaction";

const Transactions = () => {
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [sum, setSum] = useState("");

  const [isActive, setIsActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"Витрати" | "Доходи">(
    "Витрати",
  );

  const expenseTransactions: Transaction[] = useSelector(
    expenseSelectors.selectAll,
  );
  const incomeTransactions: Transaction[] = useSelector(
    incomeSelectors.selectAll,
  );

  const transactions =
    activeCategory === "Витрати" ? expenseTransactions : incomeTransactions;

  const dispatch = useDispatch();

  const expenseCategories: Array<string> = [
    "Products",
    "Alcohol",
    "Fun",
    "Health",
    "Transport",
    "Home",
    "Technic",
    "Bills",
    "Hobby",
    "Learn",
    "Other",
  ];

  const incomeCategories: Array<string> = ["Salary", "Extra"];

  const categories =
    activeCategory === "Витрати" ? expenseCategories : incomeCategories;

  function changeDesc(value: string) {
    setDesc(value);
  }

  function setCateg(value: string) {
    setCategory(value);
    setIsActive(false);
  }

  function changeSum(value: string) {
    setSum(value);
  }

  function changeActive(value: boolean) {
    setIsActive(value);
  }

  function addTransaction() {
    if (desc && category && sum !== null) {
      if (activeCategory === "Витрати") {
        dispatch(
          addExpense({
            id: nanoid(),
            title: desc,
            category: category,
            date: Date.now(),
            sum: Number(sum),
          }),
        );
      } else {
        dispatch(
          addIncome({
            id: nanoid(),
            title: desc,
            category: category,
            date: Date.now(),
            sum: Number(sum),
          }),
        );
      }
    }

    clearInputs();
  }

  function clearInputs() {
    setDesc("");
    setCategory("");
    setSum("");
  }

  function onIncomeChange() {
    setActiveCategory("Доходи");
  }

  function onExpenseChange() {
    setActiveCategory("Витрати");
  }

  function remove(id: string) {
    if (activeCategory === "Витрати") {
      dispatch(removeExpense(id));
    } else {
      dispatch(removeIncome(id));
    }
  }

  return (
    <section className={s.transactions}>
      <div className={s.buttons}>
        <button
          type="button"
          className={`${activeCategory === "Витрати" ? `${s.active} ${s.switchBtn}` : s.switchBtn}`}
          onClick={onExpenseChange}
        >
          Витрати
        </button>
        <button
          type="button"
          className={`${activeCategory === "Доходи" ? `${s.active} ${s.switchBtn}` : s.switchBtn}`}
          onClick={onIncomeChange}
        >
          Доходи
        </button>
      </div>
      <div className={s.main}>
        <div className={s.mainWrapper}>
          <p className={s.date}>{new Date().toLocaleDateString()}</p>
          <input
            type="text"
            placeholder="Опис прибутку"
            onChange={(e) => changeDesc(e.target.value)}
            value={desc}
            className={s.descInput}
          />
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder="Категорія прибутку"
              value={category}
              className={s.categoryInput}
              onClick={() => changeActive(!isActive)}
              readOnly
            />
            <button
              className={`${s.SVG} ${isActive && s.svgIsActive}`}
              onClick={() => changeActive(!isActive)}
            >
              <GoChevronDown fill="#c7ccdc" />
            </button>
            {isActive && (
              <ul className={s.categsList}>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => setCateg(category)}
                    className={s.categListItem}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="text"
            placeholder="0,00"
            onChange={(e) => changeSum(e.target.value)}
            value={sum}
            className={s.sumInput}
          />
          <div className={s.mainBtns}>
            <button type="button" onClick={addTransaction} className={s.addBtn}>
              Ввести
            </button>
            <button type="button" onClick={clearInputs} className={s.clearbtn}>
              Очистити
            </button>
          </div>
        </div>
        <div className={s.transactionsWrapper}>
          <table className={s.transactionsTable}>
            <thead>
              <tr>
                <th>ДАТА</th>
                <th>ОПИС</th>
                <th>КАТЕГОРІЯ</th>
                <th>СУМА</th>
                <th></th>
              </tr>
            </thead>
          </table>

          <div className={s.tableBodyWrapper}>
            <table className={s.transactionsTable}>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      {new Date(transaction.date).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>

                    <td>{transaction.title}</td>

                    <td>{transaction.category}</td>

                  <td>
  <span
    className={
      activeCategory === "Доходи" ? s.green : s.red
    }
  >
{Number(transaction.sum).toLocaleString("uk-UA")} грн.  </span>
</td>
                    <td>
                      <button
                        type="button"
                        className={s.deleteBtn}
                        onClick={() => remove(transaction.id)}
                      >
                        <GoTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
