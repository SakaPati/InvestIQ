import { Graf } from "@/assets";
import { Container } from "../utils/container/Container";
import s from "./Home.module.css"

export const Home = () => {
    return (
        <section>
            <Container>
                <div className={s.test}>
                    <p className={s.calculations}>Перейти до розрахунків <Graf className={s.graf} /></p>

                    <p className={s.balance}>Баланс:</p>
                    <div className={s.balanceContainer}>
                        <input type="number" placeholder="00.00 UAH" className={s.balanceInput} />
                        <button type="button" className={s.balanceButton}>підтвердити</button>
                    </div>
                </div>
            </Container>
        </section>
    );
}