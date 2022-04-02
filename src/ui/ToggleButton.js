import styles from "./ToggleButton.module.css";

const ToggleButton = (props) => {
  return (
    <div>
      <button className={styles.btn} type={props.type}>
        {props.label}
      </button>
    </div>
  );
};

export default ToggleButton;
