import s from "./Transactions.module.css";
import { useState } from "react";

const Transactions = () => {
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [sum, setSum] = useState("0,00");
  const [isActive, setIsActive] = useState(false);

  const changeDesc = (value: string) => {
    setDesc(value);
  };

  const changeSum = (value: string) => {
    setSum(value);
  };

  const changeActive = (value: boolean) => {
    setIsActive(value);
  };

  const setCateg = (value: string) => {
    setCategory(value);
  };

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
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Products
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Alcohol
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Fun
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Health
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Transport
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Home
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Technic
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Bills
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Hobby
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Learn
              </li>
              <li onClick={(e) => setCateg(e.currentTarget.textContent)}>
                Other
              </li>
            </ul>
          )}
          <input
            type="text"
            placeholder="0,00"
            onChange={(e) => changeSum(e.target.value)}
          />
          <div className={s.mainBtns}>
            <button type="button">Ввести</button>
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
