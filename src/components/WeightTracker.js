import styles from "./WeightTracker.module.css";
import Button from "../ui/Button";
import { useState } from "react";

const WeightTracker = () => {
  const [weightInput, setWeightInput] = useState();

  const DUMMY_INPUTS = [145, 150, 155, 160, 165];

  const inputHandler = (e) => {
    setWeightInput(e.target.value);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    console.log(weightInput);
  };

  const outputArray = (e) => {};

  return (
    <div>
      <form className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Enter weight"
          onChange={inputHandler}
        />
        <div className={styles.trackerBtn}>
          <Button type="submit" label="Submit" onClick={onClickHandler} />
        </div>
      </form>
      <div className={styles.chartContainer}>
        {DUMMY_INPUTS.map((input) => (
          <li key={input}>{input}</li>
        ))}
      </div>
    </div>
  );
};

export default WeightTracker;
