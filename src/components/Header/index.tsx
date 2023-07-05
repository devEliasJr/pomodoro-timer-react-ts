import { HeaderContainer } from "./styles";
import logo from "../../assets/Logo.svg";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <HeaderContainer>
      <img src={logo} />
      <nav>
        <NavLink to="/">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}

export default Header;
