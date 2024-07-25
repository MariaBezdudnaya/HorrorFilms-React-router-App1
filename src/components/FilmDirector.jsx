// Компонент со страницей director в Tabs
import { Await, defer, useLoaderData } from "react-router-dom";
import { mockFetch } from "../utils/api";
import { Suspense } from "react";
import { Loader } from "../components/Loader";

export const filmLoader = ({ params: { id } }) => { // В неё прокидывается объект с params, откуда мы можем достать id
  const film = mockFetch(`/films/${id}`); // Делаем запрос на фильм
  
  return defer({ // Возвращаем объект с фильмом. Defer - утилита, которая позволяет отложить данные, возвращаемые из лодера, прокидывая промис вместо готовых данных
    film,
  });
};

export const FilmDirector = () => {
  
  const data = useLoaderData();
  if (!data) {
    console.error("useLoaderData()");
    return;
  }
  
  const { film } = data; // Вместо компонента передаём функцию. В film приходит промис, который передали пропсу resolve

  return (
    <Suspense fallback={<Loader />}> 
      {/* Компонент Await используется для рендеринга отложенных данных, прокидывает данные, когда они готовы. Должен быть обёрнут в компонент React.Suspense или React.SuspenseList для использования fallback (колесо загрузки) в случае неуспешной загрузки */}
      <Await resolve={film}> 
        {({ directedBy, imageDirector }) => ( 
          <div className="film-director_container">
            <img
              className="film-director_image"
              src={ imageDirector } 
              alt="Rounded avatar"
            />
            <div className="film-director_info"> 
              <div className="film-director_name"> Director: { directedBy } </div>
              <p className="film-director_about">
                About Person: <br/>
                Career: Director, Screenwriter, Producer, Editor<br/>
                Genres: Drama, short film, horrors, thriller<br/>
                Total films: 10, 2013 - 2024
              </p>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
