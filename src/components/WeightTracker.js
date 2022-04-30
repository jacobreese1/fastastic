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

  const dummy_array = ["123", "234", "345", "456", "567"];
  // const dummy_array2 = [567, 456, 345, 234, 123];

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

  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: dummy_array,
      },
    ],
  };

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
          <li key={input.id}>
            <div className={styles.weight}>{input.weight}</div>
            <div className={styles.date}>{input.date}</div>
          </li>
        ))}
        <div className={styles.chart}>
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default WeightTracker;
