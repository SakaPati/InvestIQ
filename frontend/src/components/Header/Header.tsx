import { RiLogoutBoxRLine } from "react-icons/ri";
import s from "./Header.module.css";
import { Container } from "../utils/container/Container";
import { Logo } from "@/assets";
import { useSelector } from "react-redux";
import { selectUsername } from "@/redux/slices/user";
import { Link } from "react-router-dom";

export default function Header() {
  const username: string | null = useSelector(selectUsername);

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
              <div className={s.userAvatar}>
                <span>{firstLetterOfUserName}</span>
              </div>
              <p className={s.userDetailTxt}>{username}</p>
            </div>
            <span className={s.divider}></span>
            <button type="button" className={s.logoutBtn}>
              <RiLogoutBoxRLine className={s.logoutIcon} />
              <span className={s.logoutTxt}>Вийти</span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}