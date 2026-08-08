// import { useState } from "react";
// import { Colors, defaults } from "chart.js";
import styles from "./TransactionList.module.css";
import { IoTrashOutline } from "react-icons/io5";
import { PiCalculatorLight } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
  import { useState, useEffect } from "react";
// import { Container } from "../utils/container/Container";
// import { color } from "chart.js/helpers";
import INITIAL_DATA from "./Transaction.json"
import { Navigate, BrowserRouter, Routes, Route} from "react-router";
import { color } from "chart.js/helpers";
import { FaArrowLeft } from "react-icons/fa6";


const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;

export default function TransactionList() {
  const [data, setData] = useState(INITIAL_DATA);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0.00);
  const [confirm, setConfirm] = useState("");
  const [category, setCategory] = useState("");
  const [tab, setTab] = useState<"Income" | "Expense">("Income");
  const formattedDate = today.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

// save
// useEffect(() => {
//   localStorage.setItem("data", JSON.stringify(data));
// }, [data]);

  function handleDeleteTransaction(id: number) {
    setData((prevData) =>
      prevData.filter((transaction) => transaction.id !== id),
    );
    console.log(`Transaction with id ${id} deleted`);
  }




const filteredData = data.filter((transaction) => {
    const amount = parseFloat(transaction.amount);

    if (tab === "Expense") {
      return amount < 0;
    }

    return amount > 0; 
  });
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<TransactionList />} />
        </Routes>
      </BrowserRouter> */}
      <svg className={styles["back"]} width="320" height="342" viewBox="0 0 320 342" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0H320V342H120C53.7258 342 0 288.274 0 222V0Z" fill="#F5F6FB" />
      </svg>
      <div style={{display: confirm === "active" ? "flex" : "none" }} className={styles["info-input-box"]}>
            <button onClick={()=>{setConfirm("unactive")}} className={styles["butto-arrow"]}><FaArrowLeft className={styles["arrow"]} /></button>
            <input
              className={styles["info-input"]}
              type="text"
              placeholder="Введіть опис транзакції"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <label className={styles["info-select-title"]} for="profit">
              Категорія прибутку:
            </label> */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="profit"
              name="profit"
              className={`${styles["info-selectActive"]} ${tab === "Expense" ? styles["info-select"] : ""}`}
            >
              <option>Категорія товара</option>
              <option value="1">ЗП</option>
              <option value="2">Дод.Прибуток</option>
              {/* <option value="audi">ПРОДУКТИ</option>
            <option value="audi">ТРНСПОРТ</option> */}
              <option value="3">Інше</option>
            </select>
                        {/* <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              id="profit"
              name="profit"
              className={`${styles["info-selectExpenseActive"]} ${tab === "Income" ? styles["info-selectExpense"] : ""}`}
            >
              <option>Категорія витрат</option>
              <option value="7">Здоровя</option>
              <option value="8">Транспорт</option> */}
              {/* <option value="audi">ПРОДУКТИ</option>
            <option value="audi">ТРНСПОРТ</option> */}
              {/* <option value="3">Інше</option>
            </select> */}
            <div className={styles["info-box-el"]}>
            <input
              className={styles["info-const"]}
              value={cost}
              type="number"
              placeholder="0.00"
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
            />
            <PiCalculatorLight className={styles["info-calculator"]} />
                </div>
                        <div className={styles["button-container"]}>
          <button
            onClick={() => {
              if (description.trim() === "") return;
          
              const CATEGORY_MAP: Record<string, string> = {
                "1": "ЗП",
                "2": "Дод. Прибуток",
                "3": "Інше",
                "7": "Здоров'я",
                "8": "Транспорт",
              };
 


              const newData = [
                ...data,
                {
                  // Використовуємо криптографічно унікальний ID замість data.length + 1
                  id: crypto.randomUUID(),
                  date: formattedDate,
                  description: description.trim(),
                  // Шукаємо категорію за значенням у словнику або залишаємо оригінальне значення
                  category: CATEGORY_MAP[category] || category || "Інше",
                  // Якщо далі потрібні математичні обчислення, перетворюємо назад у число
                  amount: cost.toFixed(2),
                },
              ];
              setData(newData);
              setDescription("");
            }}
            className={styles["tableBody-button"]}
            style={{ display: confirm === "active" ? "block" : "none" }}
          >
            ВВЕСТИ
          </button>
          <button
            className={styles["tableBody-button2"]}
            style={{ display: confirm === "active" ? "block" : "none" }}
            onClick={() => {
              setData([]);
            }}
          >
            ОЧИСТИТИ
          </button>
        </div>
          </div>
      
      <div 
    className={styles["transaction-list-container"]}
    style={{ display: confirm === "active" ? "none" : "block" }}
  >
        <button
          className={`${styles["Tabs"]} ${tab === "Expense" ? styles["TabsActive"] : ""}`}
          onClick={() => setTab("Expense") }
        >
          ВИТРАТИ
        </button>
        <button
          onClick={() => setTab("Income")}
          className={`${styles["Tabs"]} ${tab === "Income" ? styles["TabsActive"] : ""}`}
        >
          ДОХІД
        </button>
              <p className={styles["balance-text"]} >Баланс:</p>
        <div className={styles["box-balance"]}>
          <h3 className={styles["balance"]}>55 000.00 UAH</h3>
          <button onClick={()=>{setConfirm("active")}} className={styles["confirm"]}>ПІДТВЕРДИТИ</button>
        </div>
        <div className={styles["info-block"]}>

          <IoCalendarOutline style={{color:"#52555F", marginRight:"10px"}} />
          <h3 className={styles["info-Date"]}>
            {formattedDate}
          </h3>

          <div className={styles["info-input-box"]}>
            <input
              className={styles["info-input"]}
              type="text"
              placeholder="Введіть опис транзакції"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <label className={styles["info-select-title"]} for="profit">
              Категорія прибутку:
            </label> */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="profit"
              name="profit"
              className={`${styles["info-selectActive"]} ${tab === "Expense" ? styles["info-select"] : ""}`}
            >
              <option>Категорія прибутку</option>
              <option value="1">ЗП</option>
              <option value="2">Дод.Прибуток</option>
              {/* <option value="audi">ПРОДУКТИ</option>
            <option value="audi">ТРНСПОРТ</option> */}
              <option value="3">Інше</option>
            </select>
                        <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              id="profit"
              name="profit"
              className={`${styles["info-selectExpenseActive"]} ${tab === "Income" ? styles["info-selectExpense"] : ""}`}
            >
              <option>Категорія витрат</option>
              <option value="7">Здоровя</option>
              <option value="8">Транспорт</option>
              {/* <option value="audi">ПРОДУКТИ</option>
            <option value="audi">ТРНСПОРТ</option> */}
              <option value="3">Інше</option>
            </select>

            <input
              className={styles["info-const"]}
              value={cost}
              type="number"
              placeholder="0.00"
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
            />
            <PiCalculatorLight className={styles["info-calculator"]} />
          </div>
        </div>
        <div className={styles["button-container"]}>
          <button
            onClick={() => {
              if (description.trim() === "") return;
          
              const CATEGORY_MAP: Record<string, string> = {
                "1": "ЗП",
                "2": "Дод. Прибуток",
                "3": "Інше",
                "7": "Здоров'я",
                "8": "Транспорт",
              };
 


              const newData = [
                ...data,
                {
                  // Використовуємо криптографічно унікальний ID замість data.length + 1
                  id: crypto.randomUUID(),
                  date: formattedDate,
                  description: description.trim(),
                  // Шукаємо категорію за значенням у словнику або залишаємо оригінальне значення
                  category: CATEGORY_MAP[category] || category || "Інше",
                  // Якщо далі потрібні математичні обчислення, перетворюємо назад у число
                  amount: cost.toFixed(2),
                },
              ];
              setData(newData);
              setDescription("");
            }}
            className={styles["tableBody-button"]}
          >
            ВВЕСТИ
          </button>
          <button
            className={styles["tableBody-button2"]}
            onClick={() => {
              setData([]);
            }}
          >
            ОЧИСТИТИ
          </button>
        </div>
        <table className={styles["table"]}>
          <thead className={styles["tablehead"]}>
            <tr>
              <th className={styles["tableHead-cell"]}>Дата</th>
              <th className={styles["tableHead-cell"]}>Опис</th>
              <th className={styles["tableHead-cell"]}>Категорія</th>
              <th className={styles["tableHead-cell"]}>Сума</th>
            </tr>
          </thead>
          <tbody className={styles["tablebody"]}>
            {filteredData.map((transaction) => (
              <tr className={styles["tableBody-row"]} key={transaction.id}>
                <div className={styles["tableBody-row-box"]}>
                  <td className={styles["tableBody-cell"]}>
                    {transaction.date}
                  </td>
                  <td className={styles["tableBody-cell-title"]}>
                    {transaction.description}
                  </td>
                </div>

                <td className={styles["tableBody-cell-tablet"]}>
                  {transaction.date}
                </td>
                <td className={styles["tableBody-cell-title-tablet"]}>
                  {transaction.description}
                </td>
                <td className={styles["tableBody-cell"]}>
                  {transaction.category}
                </td>
                <td className={styles["tableBody-cell"]}>
                  <div className={styles["tableBody-button-box"]}>
                    <td
                      style={{
                        color:
                          transaction.amount < "0.00" ? "#b10000" : "#006f02",
                      }}
                      className={styles["tableBody-cell-amount"]}
                    >
                      {transaction.amount}
                    </td>
                    <button
                      className={styles["tableBody-cell-button"]}
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <IoTrashOutline
                        className={styles["tableBody-cell-icon"]}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles["botton-box"]}>
                <button
          className={`${styles["TabsMobile"]} ${tab === "Expense" ? styles["TabsMobileA"] : ""}`}
          onClick={() => setTab("Expense") }
        >
          ВИТРАТИ
        </button>
        <button
          onClick={() => setTab("Income")}
          className={`${styles["TabsMobile"]} ${tab === "Income" ? styles["TabsMobileA"] : ""}`}
        >
          ДОХІД
        </button>
        </div>
      </div>
    </>
  );
}
