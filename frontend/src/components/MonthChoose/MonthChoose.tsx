import { useDispatch, useSelector } from "react-redux";
import s from "./MonthChoose.module.css";
import {
  nextMonth,
  prevMonth,
  selectFormattedMonth,
} from "@/redux/slices/monthSlice";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export function MonthChoose() {
  const dispatch = useDispatch();
  const formattedDate = useSelector(selectFormattedMonth);

  return (
    <section className={s.section}>
          <button
        type="button"
        className={s.btn}
        onClick={() => dispatch(prevMonth())}
      >
        <MdNavigateBefore className={s.icon} size={20}/>
      </button>
      <div className={s.textWrapper}>
      <h2 className={s.title}>Поточний період:</h2>
      <p className={s.month}>{formattedDate}</p>
      </div>
      <button
        type="button"
        className={s.btn}
        onClick={() => dispatch(nextMonth())}
      >
        <MdNavigateNext className={s.icon} size={20}/>
      </button>
    </section>
  );
}