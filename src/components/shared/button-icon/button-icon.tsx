import { ReactNode } from "react";
import style from "./button-icon.module.scss";

interface ButtonIconProps {
  children: ReactNode;
  onClick: () => void;
  label: string;
}

const ButtonIcon = ({ label, children, onClick }: ButtonIconProps) => {
  return (
    <button role='button' onClick={onClick} className={style["button-icon"]}>
      <span className='sr-only'>{label}</span>
      {children}
    </button>
  );
};

export default ButtonIcon;
