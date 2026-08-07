import { IoCloseSharp } from "react-icons/io5"; 
import s from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal = ({ isOpen, title, onConfirm, onCancel }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={s.backdrop} onClick={onCancel}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onCancel}><IoCloseSharp/></button>
        <h2 className={s.title}>{title}</h2>
        <div className={s.actions}>
          <button className={s.confirmBtn} onClick={onConfirm}>ТАК</button>
          <button className={s.cancelBtn} onClick={onCancel}>НІ</button>
        </div>
      </div>
    </div>
  );
};