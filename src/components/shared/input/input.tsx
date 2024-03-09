import { ComponentPropsWithoutRef, ReactNode } from "react";
import style from "./input.module.scss";
import clsx from "clsx";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  icon?: ReactNode;
  error?: string;
}

const Input = (inputProps: InputProps) => {
  const { icon, error, ...props } = inputProps;

  return (
    <div className='relative flex gap-1 flex-col'>
      {icon ? <div className={style["input-icon"]}>{icon}</div> : null}

      <input
        className={clsx(
          style["input"],
          icon ? style["input-padding-with-icon"] : style["input-padding"],
          error && style["bg-error"]
        )}
        {...props}
      />

      {error ? <span className={style["error-message"]}>{error}</span> : null}
    </div>
  );
};

export default Input;
