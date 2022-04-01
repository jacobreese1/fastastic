import styles from "./App.module.css";
import logo from "./design/images/logo-type.png"

function App() {
  return (
    <div className={styles.App}>
      <div>
        <header>
          <img src={logo} alt="Logo" className={styles.logo} />
        </header>
      </div>
    </div>
  );
}

export default App;
