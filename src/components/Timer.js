import styles from "./Timer.module.css";
import { useState, useEffect } from "react";
import ToggleButton from "../ui/ToggleButton";

const Timer = () => {
  const calculateTimeLeft = () => {
    const currentTime = new Date();
    const endTime = Date.parse("april 3, 2022 18:00:00");
    const diff = endTime - currentTime;

    let timeLeft = {};

    if (diff > 0) {
      timeLeft = {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });
  
  return (
    <div className={styles.Timer}>
      <div>
        <ul className={styles.timerContainer}>
          <li className={styles.timerNumber}>
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
          <ToggleButton label="Presets" type="Submit"></ToggleButton>
    </div>
  );
};

export default Timer;
