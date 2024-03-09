import { ComponentPropsWithoutRef } from "react";
import style from "./button.module.scss";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button className={style["button"]} role='button' {...props}>
      {props.label}
    </button>
  );
};

export default Button;
