import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button
        className={styles.btn}
        type={props.type}
        // onClick={() => onClickHandler(props.label)}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
};

export default Button;
