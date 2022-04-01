import styles from "./Header.module.css";
import logo from "../design/images/logo-type.png";

const Header = () => {
  return (
    <div>
      <header>
        <img src={logo} alt="Logo" className={styles.logo} />
      </header>
    </div>
  );
};

export default Header;