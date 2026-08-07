import { useGoogleLogin } from '@react-oauth/google';
import s from "./Authorization.module.css";
import { GoogleLogo } from "@/assets";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/redux/slices/user';

interface GoogleUser {
    email: string;
    name: string;
    picture: string;
    sub: string;
}

export const AuthButtons = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        'Authorization': `Bearer ${tokenResponse.access_token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const user: GoogleUser = res.data;

                dispatch(login({
                    username: user.name,
                    email: user.email,
                    avatar: user.picture,
                    isLoggedIn: true,
                    token: tokenResponse.access_token
                }));

                navigate("/");
            } catch (error) {
                console.error('Ошибка при получении данных пользователя Google:', error);
            }
        },
        onError: (err) => console.error('Google login error', err),
    });

    return (
        <button className={s.googleAuthButton} onClick={() => googleLogin()}>
            <GoogleLogo className={s.googleLogo} />
            Google
        </button>
    );
};