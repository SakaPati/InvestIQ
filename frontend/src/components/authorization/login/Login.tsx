import { useState } from "react";
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
    email: string,
    password: string
}

type FormErrors = Partial<Record<keyof UserFormDate, string>>;

export const Login = () => {
    const [errors, setErrors] = useState<FormErrors>({});

    const valid = (data: UserFormDate): FormErrors => {
        const newErros: FormErrors = {};

        if (!data.email || data.email.trim() === "") newErros.email = "це обов’язкове поле"
        if (!data.password || data.password.trim() === "") newErros.password = "це обов’язкове поле"

        return newErros;
    }

    const handleSubmite = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({});

        const formDate = new FormData(e.currentTarget)

        const fields: UserFormDate = {
            email: formDate.get("email") as string,
            password: formDate.get("password") as string
        }

        const validationErrors: FormErrors = valid(fields);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return;
        }
    }

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
                        <form onSubmit={handleSubmite} className={s.loginForm}>
                            <div>
                                <label htmlFor="useremail">Електронна пошта:</label>
                                <input type="email" id="useremail" name="email" placeholder="your@email.com" required />
                                {errors.email && <p>{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password">Пароль:</label>
                                <input type="text" id="password" name="password" placeholder="Пароль" required />
                                {errors.password && <p style={{ color: 'red', margin: 0 }}>{errors.password}</p>}
                            </div>

                            <div className={s.formActions}>
                                <button type="submit" className={s.submitBtn}>Увійти</button>
                                <button type="button" className={s.registerBtn}>Реєстрація</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    )
}