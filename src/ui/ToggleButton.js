import styles from "./ToggleButton.module.css";

const ToggleButton = (props) => {
  return (
    <div>
      <input
        className={styles.btn}
        type={props.type}
        label={props.label}
        id={props.id}
      ></input>
      <label className={styles.btnLabel} htmlFor={props.id}>
        <span className={styles.btnBtn} />
      </label>
      {props.display}
    </div>
  );
};

export default ToggleButton;
