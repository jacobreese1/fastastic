import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button className={styles.btn} type={props.type}>
        {props.label}
      </button>
    </div>
  );
};

export default Button;
