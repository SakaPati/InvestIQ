import s from "./Transactions.module.css";
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { nanoid } from "@reduxjs/toolkit";
import { GoTrash } from "react-icons/go";

const Transactions = () => {
  interface DescOfTransaction {
    date: Date;
    desc: string;
    category: string;
    sum: string;
    id: string;
  }

  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [sum, setSum] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [transactions, setTransactions] = useState<DescOfTransaction[]>([]);

  const changeDesc = (value: string) => {
    setDesc(value);
  };

  const setCateg = (value: string) => {
    setCategory(value);
    setIsActive(false);
  };

  const changeSum = (value: string) => {
    setSum(value);
  };

  const changeActive = (value: boolean) => {
    setIsActive(value);
  };

  const addTransaction = () => {
    if (desc && category && sum !== null) {
      setTransactions([
        ...transactions,
        {
          date: new Date(),
          desc: desc,
          category: category,
          sum: sum,
          id: nanoid(),
        },
      ]);
    }
    setDesc("");
    setCategory("");
    setSum("");
  };

  const clearInputs = () => {
    setDesc("");
    setCategory("");
    setSum("");
  };

  const categories: Array<string> = [
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

  const deleteTransaction = (id: string) => {
    setTransactions(
      transactions.filter((transaction) => {
        return transaction.id !== id;
      }),
    );
  };

  return (
    <section className={s.transactions}>
      <div className={s.buttons}>
        <button type="button" className={s.switchBtn}>
          Витрати
        </button>
        <button type="button" className={s.switchBtn}>
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
                {categories.map((ctg, index) => (
                  <li
                    key={index}
                    onClick={() => setCateg(ctg)}
                    className={s.categListItem}
                  >
                    {ctg}
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
          <ul className={s.descTransaction}>
            <li>ДАТА</li>
            <li>ОПИС</li>
            <li>КАТЕГОРІЯ</li>
            <li>СУМА</li>
          </ul>
          <ul className={s.transctions}>
            {transactions.map((transaction) => (
              <li key={transaction.id} className={s.transactionListItem}>
                <p className={s.listItemEl}>
                  {transaction.date.toLocaleDateString()}
                </p>
                <p className={s.listItemEl}>{transaction.desc}</p>
                <p className={s.listItemEl}>{transaction.category}</p>
                <p className={s.listItemSalary}>{transaction.sum} грн.</p>
                <button
                  type="button"
                  className={s.deleteBtn}
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <GoTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
