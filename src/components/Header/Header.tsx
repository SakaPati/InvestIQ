import { RiLogoutBoxRLine } from "react-icons/ri";
import s from "./Header.module.css";
import { Container } from "@/utils/container/Container";
import { Logo } from "@/assets";
import { useSelector } from "react-redux";

export default function Header() {
  const username: string = useSelector((state: any) => state.user.username) || "";

  const firstLetterOfUserName = username.slice(0, 1) || "";

  return (
    <header className={s.header}>
     <Container className={s.headerPosition}>
        <div className={s.headerLogo}>
          <Logo className={s.logoSvg} />
          <span className={s.logoText}>investiq</span>
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
      </Container>
    </header>
  );
}
