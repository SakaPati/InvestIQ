import s from "./Income.module.css";
import icons from "../../../public/data/incomeReport.json";
import { Salary, Extra } from "../IncomeIcons/IncomeIcons";
import { useState } from "react";

export function Income() {
  type Category = "Salary" | "Extra";
  const [active, setActive] = useState<Category>("Salary");

  const iconMap = {
    Salary,
    Extra,
  };

const handleActiveClick = (id: Category) => {
  setActive(id);
};

  return (
    <ul className={s.list}>
      {icons.map((icon) => {
        const id = icon.id as Category;
        const Icon = iconMap[id];
        return (
          <li key={icon.id}>
            <Icon
              className={icon.id === active ? `${s.active} ${s.icon}` : s.icon}
              onClick={() => handleActiveClick(id)}
            />
            <h3 className={s.iconName}>{icon.title.toUpperCase()}</h3>
          </li>
        );
      })}
    </ul>
  );
}
