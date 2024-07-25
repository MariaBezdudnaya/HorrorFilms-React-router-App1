// Главная страница
import { LinkButton } from "../components/LinkButton";
import { ROUTES } from "../constants";

export const HomePage = () => {
  return (
    <div className="homePage-text">
      <h1 className="homePage-greeting">
        Welcome to Horror Movie App!
      </h1>
      <p className="homePage-descr">See new horrors! </p>

      <LinkButton to={ROUTES.films} title="View Films" />
    </div>
  );
};
