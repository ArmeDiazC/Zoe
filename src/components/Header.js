import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./styles/Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
    </div>
  );
};

export default Header;
