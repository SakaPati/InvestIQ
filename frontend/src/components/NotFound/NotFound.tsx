import { Link } from "react-router-dom";
import s from "./NotFound.module.css";

export const NotFound = () => {
    return (
        <section className={s.container}>
            <div className={s.card}>
                <div className={s.errorCode}>404</div>
                <div className={s.circle}></div>
                <h1 className={s.title}>УПССС!</h1>
                <p className={s.subtitle}>Кажется, что-то пошло не так...</p>
                <p className={s.description}>Страница не найдена или была перемещена</p>
                <Link to="/" className={s.button}>
                    Вернуться на главную
                </Link>
            </div>
        </section>
    );
};