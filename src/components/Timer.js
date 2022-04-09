import styles from "./Timer.module.css";
import { useState, useEffect } from "react";
import ToggleButton from "../ui/ToggleButton";
import Button from "../ui/Button";

const Timer = () => {
  const [isNegative, setIsNegative] = useState(false);

  const calculateTimeLeft = (value) => {
    const currentTime = new Date();
    // const stopTime = new Date();

    const endTime = Date.toString(value);
    const stopTime = Date.parse(endTime);

    console.log(endTime);
    // stopTime.setDate(stopTime.getDate() + 1);
    // stopTime.setHours(18, 0, 0, 0);

    // console.log(endTime)
    const diff = stopTime - currentTime;

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

  const onClickHandler = (label) => {
    const stopTime = new Date();

    if (label == "10pm - 6pm") {
      stopTime.setDate(stopTime.getDate() + 1);
      stopTime.setHours(18, 0, 0, 0);
      calculateTimeLeft(stopTime);
      console.log(stopTime);
    } else if (label == "6pm - 12pm") {
      stopTime.setDate(stopTime.getDate() + 1);
      stopTime.setHours(12, 0, 0, 0);
    } else if (label == "8pm - 12pm") {
      stopTime.setDate(stopTime.getDate() + 1);
      stopTime.setHours(12, 0, 0, 0);
    }
    // return stopTime;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(() => {}));

  if (timeLeft > 24) {
    setIsNegative(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(() => {}));
    }, 1000);
  });

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
              label="10pm - 6pm"
              onClick={() => onClickHandler("10pm - 6pm")}
            />
            <Button
              type="submit"
              label="6pm - 12pm"
              onClick={() => onClickHandler("6pm - 12pm")}
            />
            <Button
              type="submit"
              label="8pm - 12pm"
              onClick={() => onClickHandler("8pm - 12pm")}
            />
          </div>
        }
      />
    </div>
  );
};

export default Timer;
