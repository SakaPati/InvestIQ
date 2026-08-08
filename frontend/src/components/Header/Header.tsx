import { RiLogoutBoxRLine } from "react-icons/ri";
import s from "./Header.module.css";
import { Container } from "../utils/container/Container";
import { Logo } from "@/assets";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn, selectUsername } from "@/redux/slices/user";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const username: string | null = useSelector(selectUsername);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const firstLetterOfUserName = typeof username === "string" ? username.slice(0, 1) : null;

  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerPosition}>
          <div className={s.headerLogo}>
            <Logo className={s.logoSvg} />
            <Link to="/" className={s.logoText}>investiq</Link>
          </div>
          <div className={s.headerMenu}>
            <div className={s.userDetails}>
              <div className={`${isLoggedIn ? s.userAvatar : s.none}`}>
                <span>{username ? firstLetterOfUserName : null}</span>
              </div>
              <p className={`${isLoggedIn ? s.userDetailTxt : s.none}`}>{username ? username : null}</p>
            </div>
            <span className={`${isLoggedIn ? s.divider : s.none}`}></span>
            <button type="button" className={s.logoutBtn}>
              <RiLogoutBoxRLine className={s.logoutIcon} />
              <span className={s.logoutTxt} onClick={() => {
                dispatch(logout())
                navigate("/login")
                }}>{isLoggedIn ? "Вийти" : null}</span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}