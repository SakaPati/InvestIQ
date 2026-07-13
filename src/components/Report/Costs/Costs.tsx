import array from "../../../../public/data/report.json";
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
} from "../../icons/Icons";
import s from "./Costs.module.css";



const Costs = () => {
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
    <ul className={s.list}>
      {icons.map((icon) => {
        const Icon = iconMap[icon.id as keyof typeof iconMap];
        return (
          <li key={icon.id}>
            <p className={s.counter}>0</p>
            {Icon && <Icon />}
            <h3 className={s.iconName}>{icon.title.toUpperCase()}</h3>
          </li>
        );
      })}
    </ul>
  );
};

export default Costs;
