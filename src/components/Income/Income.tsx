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
import { useEffect, useState } from "react";
import icons from "../../../public/data/report.json";
import { useSelector } from "react-redux";
import { selectExpenseCategory } from "@/redux/transaction_selectors";
import type { RootState } from "@/redux/slices/monthSlice";

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

const expenseCategories: Category[] = [
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

const englishMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

type EnglishMonth = (typeof englishMonths)[number];

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function Income({ category }: IncomeProps) {
  const [active, setActive] = useState<Category>("Products");

  const data = useSelector(selectExpenseCategory);

  const currentMonth = useSelector(
    (state: RootState) => state.monthCalendar.month,
  );

  const currentMonthName: EnglishMonth = englishMonths[currentMonth];
  
  //   const graphicData = data[currentMonthName]?.[active].transactions;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive((previousCategory) =>
      expenseCategories.includes(previousCategory) ? "Salary" : "Products",
    );
  }, [category]);

  const expenseIcons: Partial<Record<Category, IconComponent>> = {
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

  const incomeIcons: Partial<Record<Category, IconComponent>> = {
    Salary,
    Extra,
  };

  const mappedIcons = category === "Витрати" ? expenseIcons : incomeIcons;

  const handleActiveClick = (id: Category) => {
    setActive(id);
  };

  return (
    <ul className={s.list}>
      {icons.map((icon) => {
        const id = icon.id as Category;
        const Icon = mappedIcons[id];

        if (!Icon) {
          return null;
        }

        return (
          <li className={s.item} key={icon.id}>
            <p className={s.sum}>{data[currentMonthName]?.[id].total}</p>

            <Icon
              className={id === active ? `${s.active} ${s.icon}` : s.icon}
              onClick={() => handleActiveClick(id)}
            />

            <h3 className={s.iconName}>{icon.title.toUpperCase()}</h3>
          </li>
        );
      })}
    </ul>
  );
}
