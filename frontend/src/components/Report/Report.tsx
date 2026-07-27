import { useState } from "react";
import s from "./Report.module.css";
import { Next, Previous } from "@/assets";
import { Income } from "../Income/Income";
import { Sum } from "../Sum/Sum";

export function Report() {
  const [activeCategory, setActiveCategory] = useState(
    "Витрати",
  );

  function handleCategoryClick() {
    setActiveCategory((prev) => (prev === "Витрати" ? "Доходи" : "Витрати"));
  }

  return (
    <section className={s.section}>
      <div className={s.container}>
        <Sum />
        <div className={s.categoryWrapper}>
          <Previous onClick={handleCategoryClick} className={s.arrow} />
          <h3 className={s.title}>
            {activeCategory === "Витрати" ? "Витрати" : "Доходи"}
          </h3>
          <Next onClick={handleCategoryClick} className={s.arrow} />
        </div>
          <Income category={activeCategory}/>
      </div>
    </section>
  );
}
