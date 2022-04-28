import styles from "./WeightTracker.module.css";
import Button from "../ui/Button";
import { useState, useEffect } from "react";

const WeightTracker = () => {
  const [weightInput, setWeightInput] = useState("");
  const [todaysDate, setTodaysDate] = useState();
  const [weightLog, setWeightLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const date = new Date();
  const formattedDate = date.toLocaleDateString();

  // const DUMMY_INPUTS = [145, 150, 155, 160, 165];

  const inputHandler = (e) => {
    setWeightInput(e.target.value);
  };

  const onClickHandler = async (e) => {
    e.preventDefault();
    setWeightInput(weightInput);
    setTodaysDate(formattedDate);
    // const key = Math.random();
    await fetch(
      "https://fastastic-1f233-default-rtdb.firebaseio.com/weightLog.json",
      {
        method: "POST",
        body: JSON.stringify({
          // id: key,
          weightInput,
          todaysDate,
        }),
      }
    );
  };

  useEffect(() => {
    const fetchWeightLog = async () => {
      const response = await fetch(
        "https://fastastic-1f233-default-rtdb.firebaseio.com/weightLog.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedWeightLog = [];

      for (const key in responseData) {
        loadedWeightLog.push({
          id: key,
          date: responseData[key].todaysDate,
          weight: responseData[key].weightInput,
        });
      }

      setWeightLog(loadedWeightLog);
      setIsLoading(false);
    };

    fetchWeightLog().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

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
          <Button type="submit" label="Submit" onClick={onClickHandler} />
        </div>
      </form>
      <div className={styles.chartContainer}>
        {weightLog.map((input) => (
          <li key={input.id}>{input.weight}{input.date}</li>
        ))}
        {/* {weightLog} */}
      </div>
    </div>
  );
};

export default WeightTracker;
