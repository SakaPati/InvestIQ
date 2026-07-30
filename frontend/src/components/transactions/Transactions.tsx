import s from "./Transactions.module.css";
import { useState } from "react";

const Transactions = () => {
  interface DescOfTransaction {
    desc: string;
    category: string;
    sum: string;
  }

  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [sum, setSum] = useState("0,00");
  const [isActive, setIsActive] = useState(false);
  const [transactions, setTransactions] = useState<DescOfTransaction[]>([]);

  const changeDesc = (value: string) => {
    setDesc(value);
    setDesc("");
  };

  const setCateg = (value: string) => {
    setCategory(value);
    setCategory("");
  };

  const changeSum = (value: string) => {
    setSum(value);
    setSum("");
  };

  const changeActive = (value: boolean) => {
    setIsActive(value);
  };

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { desc: desc, category: category, sum: sum },
    ]);
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

  return (
    <section className={s.transactions}>
      <div className={s.buttons}>
        <button type="button">Витрати</button>
        <button type="button">Доходи</button>
      </div>
      <div className={s.main}>
        <div>
          <p>data</p>
          <input
            type="text"
            placeholder="Опис прибутку"
            onChange={(e) => changeDesc(e.target.value)}
          />
          <input type="text" placeholder="Категорія прибутку" />
          <button
            className="SVG"
            onClick={() => changeActive(!isActive)}
          ></button>
          {isActive && (
            <ul className={s.categsList}>
              {categories.map((ctg, index) => (
                <li
                  key={index}
                  onClick={(e) => setCateg(e.currentTarget.textContent)}
                >
                  {ctg}
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            placeholder="0,00"
            onChange={(e) => changeSum(e.target.value)}
          />
          <div className={s.mainBtns}>
            <button type="button" onClick={addTransaction}>Ввести</button>
            <button type="button">Очистити</button>
          </div>
        </div>
        <div className={s.transactionsWrapper}>
          <ul className={s.descTransatcion}>
            <li>ДАТА</li>
            <li>ОПИС</li>
            <li>КАТЕГОРІЯ</li>
            <li>СУМА</li>
          </ul>
          <ul className={s.transctions}>
            <li>
              <p>date*</p>
              <p>{desc}</p>
              <p>{category}</p>
              <p>{sum}</p>
              {/* <svg></svg> */}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
