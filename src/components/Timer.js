import styles from "./Timer.module.css";
import { useState, useEffect } from "react";
import ToggleButton from "../ui/ToggleButton";
import Button from "../ui/Button";

const Timer = () => {
  const [endTime, setEndTime] = useState();
  const [isNegative, setIsNegative] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const onClickHandler = async (label) => {
    const stopTime = new Date();

    if (label === "20 hours (end 6pm)") {
      stopTime.setDate(stopTime.getDate() + 1);
      stopTime.setHours(18, 0, 0, 0);
    } else if (label === "18 hours (end 4pm)") {
      stopTime.setDate(stopTime.getDate() + 1);
      stopTime.setHours(16, 0, 0, 0);
    } else if (label === "16 hours (end 12pm)") {
      stopTime.setDate(stopTime.getDate() + 1);
      stopTime.setHours(12, 0, 0, 0);
    }
    calculateTimeLeft(stopTime.toDateString());
    setEndTime(stopTime);
    console.log(endTime);

    await fetch(
      "https://fastastic-1f233-default-rtdb.firebaseio.com/fastTimer.json",
      {
        method: "DELETE",
        body: JSON.stringify({
          endTime,
        }),
      }
    );

    await fetch(
      "https://fastastic-1f233-default-rtdb.firebaseio.com/fastTimer.json",
      {
        method: "PUT",
        body: JSON.stringify({
          endTime,
        }),
      }
    );
  };

  useEffect(() => {
    const fetchFastTimer = async () => {
      await fetch(
        "https://fastastic-1f233-default-rtdb.firebaseio.com/fastTimer.json"
      )
        .then((response) => response.json())
        .then((response) => {
          setEndTime(Date.parse(response.endTime));
        });

      setIsLoading(false);
    };

    fetchFastTimer().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    fetchFastTimer();
  }, []);

  const calculateTimeLeft = () => {
    const currentTime = new Date();

    const diff = endTime - currentTime;

    let timeLeft = {};

    if (diff > 0 && Math.floor(diff / (1000 * 60 * 60)) < 24) {
      timeLeft = {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      };
    } else if (Math.floor(diff / (1000 * 60 * 60)) > 23) {
      timeLeft = {
        hours: Math.floor(diff / (1000 * 60 * 60) - 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(() => {}));

  if (timeLeft > 24) {
    setIsNegative(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(() => {}));
    }, 1000);
  }, [onClickHandler, calculateTimeLeft]);

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
    <div className={styles.Timer}>
      <div>
        <ul className={styles.timerContainer}>
          <li className={styles.timerNumber}>
            {isNegative ? (
              <div></div>
            ) : (
              <div className={styles.timeNegative}>-</div>
            )}
            {timeLeft.hours} <br /> Hours
          </li>
          <li className={styles.timerNumber}>
            {timeLeft.mins} <br /> Minutes
          </li>
          <li className={styles.timerNumber}>
            {timeLeft.secs} <br /> Seconds
          </li>
        </ul>
      </div>
      <ToggleButton
        label="Presets"
        type="checkbox"
        id="Presets"
        hiddenDisplay={
          <div>
            <Button
              type="submit"
              label="20 hours (end 6pm)"
              onClick={() => onClickHandler("20 hours (end 6pm)")}
            />
            <Button
              type="submit"
              label="18 hours (end 4pm)"
              onClick={() => onClickHandler("18 hours (end 4pm)")}
            />
            <Button
              type="submit"
              label="16 hours (end 12pm)"
              onClick={() => onClickHandler("16 hours (end 12pm)")}
            />
          </div>
        }
      />
    </div>
  );
};

export default Timer;
