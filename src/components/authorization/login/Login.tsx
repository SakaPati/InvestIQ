import { useState } from "react";
import { Container } from "../../utils/container/Container"
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
        <>
            <Container>
                <img src={getMoney} alt="Рука держит монетку" />
                <div>
                    <h1>InvestIQ</h1>
                    <p>Smart Finance</p>
                </div>

                <div>
                    <h2>Ви можете авторизуватися за допомогою акаунта Google</h2>
                    <button>
                        <GoogleLogo />
                        Google
                    </button>
                    <p>Або увійти за допомогою ел. пошти та праолю після реєстрації</p>
                    <form onSubmit={handleSubmite}>
                        <div>
                            <label htmlFor="useremail">Електронна пошта:</label>
                            <input type="email" id="useremail" name="email" required />
                            {errors.email && <p style={{ color: 'red', margin: 0 }}>{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password">Пароль:</label>
                            <input type="text" id="password" name="password" required />
                            {errors.password && <p style={{ color: 'red', margin: 0 }}>{errors.password}</p>}
                        </div>

                        <button type="submit">Увійти</button>
                        <button type="button">реєстрація</button>
                    </form>
                </div>
                <img src={upMoney} alt="Инфляция растет..." />
            </Container>
        </>
    )
}