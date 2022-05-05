import styles from "./WeightTracker.module.css";
import Button from "../ui/Button";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const WeightTracker = () => {
  const [weightInput, setWeightInput] = useState("");
  const [todaysDate, setTodaysDate] = useState();
  const [weightLog, setWeightLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const date = new Date();
  const formattedDate = date.toLocaleDateString();

  const inputHandler = (e) => {
    setWeightInput(e.target.value);
  };

  const onClickHandler = async (e) => {
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
  }, [onClickHandler]);

  const weightArray = [];
  const dateArray = [];

  for (const key in weightLog) {
    weightArray.push(weightLog[key].weight);
  }

  for (const key in weightLog) {
    dateArray.push(weightLog[key].date);
  }

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Line Chart",
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Weight(lbs)",
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Dates",
            },
          },
        ],
      },
    },
  };

  const data = {
    labels: dateArray,
    datasets: [
      {
        label: "Weight (lbs)",
        backgroundColor: "#1effbc",
        borderColor: "#1effbc",
        data: weightArray,
      },
    ],
  };

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

  return (
    <div className={styles.weightTrackerContainer}>
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
      <div className={styles.chart}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default WeightTracker;
