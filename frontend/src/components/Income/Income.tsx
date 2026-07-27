import {
  Alcohol,
  Bills,
  Extra,
  Fun,
  Health,
  Hobby,
  Home,
  Learn,
  Other,
  Products,
  Salary,
  Technic,
  Transport,
} from "@/assets";
import s from "./Income.module.css";
import { useState } from "react";
import icons from "../../../public/data/report.json";
import { useSelector } from "react-redux";
import { selectExpenseCategory, type ReturnedCategoryData } from "@/redux/transaction_selectors";

export type Category =
  | "Products"
  | "Alcohol"
  | "Fun"
  | "Health"
  | "Transport"
  | "Home"
  | "Technic"
  | "Bills"
  | "Hobby"
  | "Learn"
  | "Other"
  | "Salary"
  | "Extra";

type IncomeProps = {
  category: string;
};

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function Income({ category }: IncomeProps) {
  const [active, setActive] = useState<Category>("Products");
  const eachCategoryTotal = useSelector(selectExpenseCategory)

  const incomeIcons: Partial<Record<Category, IconComponent>> = {
    Products,
    Alcohol,
    Fun,
    Health,
    Transport,
    Home,
    Technic,
    Bills,
    Hobby,
    Learn,
    Other,
  };

  const expenseIcons: Partial<Record<Category, IconComponent>> = {
    Salary,
    Extra,
  };

  const mappedIcons =
    category === "Витрати" ? incomeIcons : expenseIcons;

  const handleActiveClick = (id: Category) => {
    setActive(id);
  };

  return (
    <>
    <ul className={s.list}>
      {icons.map((icon) => {
        const id = icon.id as Category;
        const Icon = mappedIcons[id];

        const sum: ReturnedCategoryData = eachCategoryTotal;

        if (!Icon) return null;

        return (
          <li key={icon.id}>
            <p>{sum[id].total}</p>
            <Icon
              className={
                icon.id === active
                  ? `${s.active} ${s.icon}`
                  : s.icon
              }
              onClick={() => handleActiveClick(id)}
            />

            <h3 className={s.iconName}>
              {icon.title.toUpperCase()}
            </h3>
          </li>
        );
      })}
    </ul>
    {/* {eachCategoryTotal[active].transactions} */}
    </>
  );
}