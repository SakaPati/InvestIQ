import { useState } from "react";
import s from "./Report.module.css";
import { Next, Previous } from "@/assets";
import { Income } from "../Income/Income";
import { Sum } from "../Sum/Sum";
import { MonthChoose } from "../MonthChoose/MonthChoose";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Report() {
  const [activeCategory, setActiveCategory] = useState("Витрати");

  function handleCategoryClick() {
    setActiveCategory((prev) => (prev === "Витрати" ? "Доходи" : "Витрати"));
  }

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.infoWrapper}>
        <Link to="/" className={s.mainPage}>
          <FaArrowLeftLong size={18} className={s.icon} />
          Повернутися на головну</Link>
        <MonthChoose /></div>
        <Sum />
        <div className={s.report}>
          <div className={s.categoryWrapper}>
          <Previous onClick={handleCategoryClick} className={s.arrow} />
          <h3 className={s.title}>
            {activeCategory === "Витрати" ? "Витрати" : "Доходи"}
          </h3>
          <Next onClick={handleCategoryClick} className={s.arrow} />
        </div>
        <Income category={activeCategory} />
     </div> 
     </div>
    </section>
  );
}
