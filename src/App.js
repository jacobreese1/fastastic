import styles from "./App.module.css";
import Timer from "./components/Timer";
import Header from "./ui/Header";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Timer />
    </div>
  );
}

export default App;
