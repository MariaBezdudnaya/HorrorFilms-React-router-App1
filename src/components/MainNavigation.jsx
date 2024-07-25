import { NavLink } from "react-router-dom"; // Компонент NavLink работает точно так же, как компонент Link , но он предназначен специально для отображения активных состояний ссылок, например, в панелях навигации
import { NAV_ITEMS } from "../constants";

export const MainNavigation = () => {
  return (
    <header>
      <nav className="navigation-menu">
        {NAV_ITEMS.map((navItem) => ( 
          <NavLink 
            className={({ isActive }) => 
              isActive ? "menu-item menu-item_active" : "menu-item"
            } 
            key={navItem.path} 
            to={navItem.path}
          >
            {navItem.title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};