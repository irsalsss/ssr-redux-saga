import style from "./loader.module.scss";

const Loader = () => {
  return (
    <span className={style["loader"]}>
      <span className='sr-only'>Loader</span>
    </span>
  );
};

export default Loader;
