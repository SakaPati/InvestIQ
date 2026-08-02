import { useState } from "react";
import { Container } from "@/utils/container/Container";
import s from "./Login.module.css";
import {
    getMoney,
    upMoney,
    GoogleLogo
} from "@/assets";

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
                <img src={getMoney} alt="Рука держит монетку" className={s.getMoney} />
                
                <div className={ s.heroSec}>
                    <h1 className={s.title}>InvestIQ</h1>
                    <p className={s.subTitle}>Smart Finance</p>
                </div>

                <div className={s.loginSec}>
                    <h2 className={s.googleAuthTitle}>Ви можете авторизуватися за допомогою акаунта Google</h2>
                    <button className={s.googleAuthButton}>
                        <GoogleLogo />
                        Google
                    </button>
                    <p className={s.orRegisterTitle}>Або увійти за допомогою ел. пошти та паролю після реєстрації</p>
                    <form onSubmit={handleSubmite} className={s.loginForm}>
                        <div>
                            <label htmlFor="useremail">Електронна пошта:</label>
                            <input type="email" id="useremail" name="email" placeholder="your@email.com" required />
                            {errors.email && <p style={{ color: 'red', margin: 0 }}>{errors.email}</p>}
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
                <img src={upMoney} alt="Инфляция растет..." className={ s.inflation} />
            </Container>
        </section>
    )
}