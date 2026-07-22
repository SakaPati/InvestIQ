import { useGoogleLogin } from '@react-oauth/google';
import s from "./Authorization.module.css";
import { GoogleLogo } from "@/assets";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/user';

interface GoogleUser {
    email: string;
    name: string;
    picture: string;
    sub: string;
}

export const AuthButtons = () => {
    const dispatch = useDispatch();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${tokenResponse.access_token}`,
                    'Content-Type': 'application/json'
                },
            })
            const user: GoogleUser = await res.data;
            dispatch(login({ username: user.name, email: user.email, avatar: user.picture, isLoggedIn: true }));
        },
        onError: (err) => console.error('Google login error', err),
    });


    return (
        <button className={s.googleAuthButton} onClick={() => googleLogin()}>
            <GoogleLogo />
            Google
        </button>
    );
};