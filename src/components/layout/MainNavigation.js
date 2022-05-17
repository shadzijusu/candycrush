import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Candy Crush</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Play Game</Link>
          </li>
          <li>
            <Link to="/about">About </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
