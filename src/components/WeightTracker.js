import styles from "./WeightTracker.module.css";
import Button from "../ui/Button";

const WeightTracker = () => {
  const onClickHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.tableContainer}>
      <input className={styles.input} placeholder="Enter weight" />
      <div className={styles.trackerBtn}>
        <Button type="submit" label="Submit" onClick={onClickHandler} />
      </div>
    </form>
  );
};

export default WeightTracker;
