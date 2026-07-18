import { RiLogoutBoxRLine } from "react-icons/ri"
import s from "./Header.module.css"

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.headerLogo}>
          <span className={s.logoText}>investiq</span>
        </div>

        <div className={s.headerMenu}>
          <div className={s.userAvatar}>
            <span>U</span>
          </div>
          <span className={s.divider}></span>
          <button className={s.logoutBtn}><RiLogoutBoxRLine></RiLogoutBoxRLine></button>
        </div>
      </div>
    </header>
  );
}
