import { useState } from "react";
import axios from "axios";
import { Container } from "../../utils/container/Container";
import s from "./Authorization.module.css";
import {
    getMoney,
    upMoney,
    loginHeroBackground,
    loginFooterBackground,
    loginHeroBackgroundDesk
} from "@/assets";
import { AuthButtons } from "./AuthButton";

interface UserFormDate {
    email: string;
    password: string;
}

type FormErrors = Partial<Record<keyof UserFormDate, string>>;

export const Login = () => {
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const valid = (data: UserFormDate): FormErrors => {
        const newErrors: FormErrors = {};

        if (!data.email || data.email.trim() === "") {
            newErrors.email = "це обов’язкове поле";
        }
        if (!data.password || data.password.trim() === "") {
            newErrors.password = "це обов’язкове поле";
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setApiError(null);

        const formData = new FormData(e.currentTarget);

        const fields: UserFormDate = {
            email: (formData.get("email") as string) || "",
            password: (formData.get("password") as string) || ""
        };

        const validationErrors: FormErrors = valid(fields);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post("/api/user/login", fields, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Успешный вход:", response.data);

        } catch (error: any) {
            const message = error.response?.data?.message || "Не вдалося увійти. Перевірте дані.";
            setApiError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={s.loginSection}>
            <Container>
                <div className={s.icons}>
                    <div className={s.mobileIcons}>
                        <img src={getMoney} alt="Рука держит монетку" />
                        <img src={upMoney} alt="Инфляция растет..." />
                    </div>
                    <div className={s.tableIcons}>
                        <img src={loginHeroBackground} alt="Иконки" />
                    </div>
                    <div className={s.desktopIcons}>
                        <img src={loginHeroBackgroundDesk} alt="Иконки" />
                    </div>
                    <img src={loginFooterBackground} alt="Футер иконки" className={s.footerIcons} />
                </div>

                <div className={s.formSection}>
                    <div className={s.heroSec}>
                        <h1 className={s.title}>InvestIQ</h1>
                        <p className={s.subTitle}>Smart Finance</p>
                    </div>

                    <div className={s.loginSec}>
                        <h2 className={s.googleAuthTitle}>Ви можете авторизуватися за допомогою акаунта Google</h2>
                        <AuthButtons />
                        <p className={s.orRegisterTitle}>Або увійти за допомогою ел. пошти та паролю після реєстрації</p>

                        <form onSubmit={handleSubmit} className={s.loginForm} noValidate>
                            <div>
                                <label htmlFor="useremail">Електронна пошта:</label>
                                <input
                                    type="email"
                                    id="useremail"
                                    name="email"
                                    placeholder="your@email.com"
                                />
                                {errors.email && <p className={s.errorText}>{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password">Пароль:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Пароль"
                                />
                                {errors.password && <p className={s.errorText}>{errors.password}</p>}
                            </div>

                            {apiError && <p className={s.apiErrorText}>{apiError}</p>}

                            <div className={s.formActions}>
                                <button type="submit" className={s.submitBtn} disabled={isLoading}>
                                    {isLoading ? "Вхід..." : "Увійти"}
                                </button>
                                <button type="button" className={s.registerBtn}>Реєстрація</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
};