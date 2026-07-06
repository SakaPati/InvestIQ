import s from "./Report.module.css";
import array from "../../../public/data/report.json";
import {
  Products,
  Alcohol,
  Fun,
  Health,
  Transport,
  Home,
  Technic,
  Bills,
  Learn,
  Hobby,
  Other,
} from "../icons/Icons";

export function Report() {
  const icons = array;

  const iconMap = {
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
  
  return (
    <section className={s.section}>
      <div className={s.container}>
      <h3 className={s.title}>Витрати</h3>
      <ul className={s.list}>
        {icons.map((icon) => {
          const Icon = iconMap[icon.id as keyof typeof iconMap];
          return (
            <li key={icon.id}>
              {Icon && <Icon />}
              <h3 className={s.iconName}>{icon.title.toUpperCase()}</h3>
            </li>
          );
        })}
      </ul>
      </div>
    </section>
  );
}
