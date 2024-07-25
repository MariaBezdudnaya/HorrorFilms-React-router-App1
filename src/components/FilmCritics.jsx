// Компонент со описанием критики фильма в Tabs
import { mockFetch } from "../utils/api";
import { Loader } from "../components/Loader";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

export const filmLoader = ({ params: { id } }) => { // В неё прокидывается объект с params, откуда мы можем достать id
  const film = mockFetch(`/films/${id}`); // Делаем запрос на фильм
  
  return defer({ // Возвращаем объект с фильмом. Defer - утилита, которая позволяет отложить данные, возвращаемые из лодера, прокидывая промис вместо готовых данных
    film,
  });
};

export const FilmCritics = () => {

  const data = useLoaderData();
  if (!data) {
    console.error("useLoaderData()");
    return;
  }

  const { film } = data;

  return (
    <Suspense fallback={<Loader />}> 
      <Await resolve={film}>
        {({ criticsConsensus }) => (
          <p className="film-critics">
            { criticsConsensus }
          </p>
        )}
      </Await>
    </Suspense>
  );
};
