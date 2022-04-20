import styles from "./WeightTracker.module.css";
import Button from "../ui/Button";
import { useState, useEffect } from "react";

const WeightTracker = () => {
  const [weightInput, setWeightInput] = useState("");
  const [todaysDate, setTodaysDate] = useState();
  // const [addWeight, setAddWeight] = useState([]);

  const date = new Date();
  const formattedDate = date.toLocaleDateString();

  const DUMMY_INPUTS = [145, 150, 155, 160, 165];

  const inputHandler = (e) => {
    setWeightInput(e.target.value);
  };

  const Push = async (e) => {
    e.preventDefault();
    setWeightInput(weightInput);
    setTodaysDate(formattedDate);
    await fetch(
      "https://fastastic-1f233-default-rtdb.firebaseio.com/weightLog.json",
      {
        method: "POST",
        body: JSON.stringify({
          weightInput,
          todaysDate,
        }),
      }
    );
  };

  // const onClickHandler = (e) => {
  //   e.preventDefault();
  // const newWeight = [...DUMMY_INPUTS];
  //   DUMMY_INPUTS.push(weightInput);
  //   setAddWeight(DUMMY_INPUTS);
  //   console.log(DUMMY_INPUTS);
  // };

  return (
    <div>
      <form className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Enter weight"
          value={weightInput}
          onChange={inputHandler}
          type="number"
        />
        <div className={styles.trackerBtn}>
          <Button type="submit" label="Submit" onClick={Push} />
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
