import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Graf } from "@/assets";
import { Container } from "../utils/container/Container";
import type { RootState, AppDispatch } from "@/redux/store";
import { login } from "@/redux/slices/user";
import s from "./Home.module.css";

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const [balanceInput, setBalanceInput] = useState<string>("");

    useEffect(() => {
        if (user.balance !== null && user.balance !== undefined) {
            setBalanceInput(String(user.balance));
        }
    }, [user.balance]);

    const handleConfirmBalance = () => {
        const numericBalance = Number(balanceInput);

        if (isNaN(numericBalance)) return;

        dispatch(
            login({
                ...user,
                balance: numericBalance,
            })
        );
    };

    return (
        <section>
            <Container>
                <div className={s.test}>
                    <p className={s.calculations}>
                        Перейти до розрахунків <Graf className={s.graf} />
                    </p>

                    <p className={s.balance}>Баланс:</p>
                    <div className={s.balanceContainer}>
                        <input
                            type="number"
                            placeholder="00.00 UAH"
                            className={s.balanceInput}
                            value={balanceInput}
                            onChange={(e) => setBalanceInput(e.target.value)}
                        />
                        <button
                            type="button"
                            className={s.balanceButton}
                            onClick={handleConfirmBalance}
                        >
                            підтвердити
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};