// Карточка фильма в списке
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

export const FilmCard = ({ imageUrl, title, year, id, description }) => {
  return (
    <div className="card_item">
      <div className="card-item">
        <div className="card_image">{/* Картинка */}
          <img 
            className="card-image"
            src={imageUrl}
            alt="film"
          />
        </div>

        <div className="card-info">
          <div className="card-title"> {/* title */}
              Film
          </div>
          <Link to={`${ROUTES.films}/${id}`} className="film-title_link">
            {title}
          </Link>
          <div className="film-year">
            <Link to={`${ROUTES.films}/${id}`} className="film-year_link">
              {year}
            </Link>
          </div>
        </div>

        <p className="card-description">
          {description}
        </p>
      </div>
      <hr style={{opacity: "15%"}}/>
    </div> 
  );
};
