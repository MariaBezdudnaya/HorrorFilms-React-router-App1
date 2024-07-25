import { Outlet } from "react-router-dom";
import { MainNavigation } from "./MainNavigation";

export const BaseLayout = () => {
  return (
    <div className="base-layout-menu">
      <MainNavigation />
      <div className="menu-content">
        {/* Означает, что контент всех вложенных роутов (дочерних компонентов) будет рендериться вместо данного компонента */}
        <Outlet /> 
      </div>
    </div>
  );
};
