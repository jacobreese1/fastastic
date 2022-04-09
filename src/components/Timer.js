import styles from "./Timer.module.css";
import { useState, useEffect } from "react";
import ToggleButton from "../ui/ToggleButton";
import Button from "../ui/Button";

const Timer = () => {
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);

  const setEndTime = () => {
    const stopTime = Date.parse(" ");
    let endTime = {};

    endTime = {
      Date: stopTime.setDate(stopTime.getDate() + 1),
      Hours: stopTime.setHours(22),
      Min: stopTime.setMinutes(0),
      Mil: stopTime.setMilliseconds(0),
    };
    return endTime;
  };

  const calculateTimeLeft = (end) => {
    const stopTime = new Date();
    const currentTime = new Date();

    stopTime.setDate(stopTime.getDate() + 1);
    stopTime.setHours(18, 0, 0, 0);

    const diff = stopTime - currentTime;

    let timeLeft = {};

    if (24 > diff > 0) {
      timeLeft = {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      };
    } else if (diff > 24) {
      timeLeft = {
        hours: Math.floor(diff / (1000 * 60 * 60) - 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
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
      <ToggleButton
        label="Presets"
        type="checkbox"
        id="Presets"
        hiddenDisplay={
          <div>
            <Button
              type="submit"
              label="10pm - 6pm"
              // onClick={() => timerSet("10pm - 6pm")}
            />
            <Button
              type="submit"
              label="6pm - 12pm"
              // onClick={() => timerSet("6pm - 12pm")}
            />
            <Button
              type="submit"
              label="8pm - 12pm"
              // onClick={() => timerSet("8pm - 12pm")}
            />
          </div>
        }
      />
    </div>
  );
};

export default Timer;

// const timerSet = (input) => {
//   const startTime = new Date();
//   const endTime = new Date();

//   let timer = {};

//   if (!start) {
//     switch (input) {
//       case "10pm - 6pm":
//         timer = {
//           sDate: startTime.setDate(startTime.getDate()),
//           sHours: startTime.setHours(22),
//           sMin: startTime.setMinutes(0),
//           sMil: startTime.setMilliseconds(0),
//           eDate: endTime.setDate(endTime.getDate() + 1),
//           eHours: endTime.setHours(18),
//           eMin: endTime.setMinutes(0),
//           eMil: endTime.setMilliseconds(0),
//         };
//         break;
//       case "6pm - 12pm":
//         timer = {
//           sDate: startTime.setDate(startTime.getDate()),
//           sHours: startTime.setHours(18),
//           sMin: startTime.setMinutes(0),
//           sMil: startTime.setMilliseconds(0),
//           eDate: endTime.setDate(endTime.getDate() + 1),
//           eHours: endTime.setHours(12),
//           eMin: endTime.setMinutes(0),
//           eMil: endTime.setMilliseconds(0),
//         };
//         break;
//       case "8pm - 12pm":
//         timer = {
//           sDate: startTime.setDate(startTime.getDate()),
//           sHours: startTime.setHours(18),
//           sMin: startTime.setMinutes(0),
//           sMil: startTime.setMilliseconds(0),
//           eDate: endTime.setDate(endTime.getDate() + 1),
//           eHours: endTime.setHours(12),
//           eMin: endTime.setMinutes(0),
//           eMil: endTime.setMilliseconds(0),
//         };
//         break;
//       default:
//         break;
//     }
//   }
//   return timer;
// };
