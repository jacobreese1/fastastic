import styles from "./ToggleButton.module.css";
import { useState } from "react";

const ToggleButton = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <input
        className={styles.btn}
        type={props.type}
        label={props.label}
        id={props.id}
        onClick={toggleHandler}
      ></input>
      <label className={styles.btnLabel} htmlFor={props.id}>
        <span className={styles.btnBtn} />
        <span className={styles.btnText}>{props.label}</span>
      </label>
      <div className={styles.presetBtnContainer}>
        {isClicked ? <div>{props.hiddenDisplay}</div> : <div></div>}
      </div>
    </div>
  );
};

export default ToggleButton;
