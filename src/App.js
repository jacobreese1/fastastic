import styles from "./App.module.css";
import Timer from "./components/Timer";
import WeightTracker from "./components/WeightTracker";
import Header from "./ui/Header";

const App = () => {
  return (
    <div className={styles.App}>
      <Header />
      <Timer />
      <WeightTracker />
    </div>
  );
};

export default App;
