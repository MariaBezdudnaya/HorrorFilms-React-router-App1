// Компонент с курсом
import { Await, Outlet, defer, useLoaderData } from "react-router-dom";
import { mockFetch } from "../utils/api";
import { LinkButton } from "../components/LinkButton";
import { Tabs } from "../components/Tabs";
import { Suspense } from "react";
import { Loader } from "../components/Loader";

const TABS = [ // Вкладки
  {
    path: "", // Отображается по умолчанию
    title: "About Film Director", 
  },
  {
    path: "critics", // Отображается при добавлении во вкладку сегмента critics
    title: "Film Critics",
  },
];

export const filmLoader = ({ params: { id } }) => { // В неё прокидывается объект с params, откуда мы можем достать id
  const film = mockFetch(`/films/${id}`); // Делаем запрос на фильм
  return defer({ // Возвращаем объект с фильмом. Defer - утилита, которая позволяет отложить данные, возвращаемые из лодера, прокидывая промис вместо готовых данных
    film,
  });
};

export const FilmDetails = () => {
  const { film } = useLoaderData(); // Вместо компонента передаём функцию. В film приходит промис, который передали пропсу resolve

  return (
    <Suspense fallback={<Loader />}> 
      {/* Компонент Await используется для рендеринга отложенных данных, прокидывает данные, когда они готовы. Должен быть обёрнут в компонент React.Suspense или React.SuspenseList для использования fallback (колесо загрузки) в случае неуспешной загрузки */}
      <Await resolve={film}> 
        {({ imageUrl, title, year, starring, description }) => ( 
          <div className="film-details">
            <div className="film-details_container">
              <div> 
                <img 
                  className="film-details_image"
                  src={imageUrl}
                  alt="film"
                /> {/* Картинка фильма */}
              </div>
              <div className="film-details_content">
                <div className="film-details_title">HORROR FILM</div> {/* Title */}
                <div className="film_title">{title} ({year})</div> {/* Название фильма и год выпуска */}
                <p className="film-details_starring">STARRING: {starring}</p> {/* Описание фильма */}
                <p className="film-details_descr">DESCRIPTION: {description}</p> {/* Описание фильма */}

                <div className="start-showing">
                  <LinkButton to="start-show" title="Start showing" /> {/* Авторизация */}
                </div>
              </div>
            </div>

            <div className="film-details_tabs">
              <Tabs tabs={TABS} /> {/* Вкладки с дополнительной инфой о фильме */}
              <Outlet /> {/* Дочерние компоненты Tabs */}
            </div>

          </div>
        )}
      </Await>
    </Suspense>
  );
};
