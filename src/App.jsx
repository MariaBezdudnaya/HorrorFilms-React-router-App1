import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { BaseLayout } from "./components/BaseLayout";
import { AboutPage } from "./pages/AboutPage";
import { FilmDetails, filmLoader } from "./pages/FilmDeatilsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { FilmShowPage } from "./pages/FilmShowPage";
import { ROUTES } from "./constants";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserPage } from "./pages/UserPage";
import { Loader } from "./components/Loader";
import { FilmCritics } from "./components/FilmCritics";
import { FilmDirector } from "./components/FilmDirector";
import { StartShowPage, startShowAction } from "./pages/StartShowPage";

const router = createBrowserRouter( // Используется для активации нового Data API
  createRoutesFromElements( // Утилита, которая преобразует роуты в массив из объектов
    <Route path="/" element={<BaseLayout />} errorElement={<ErrorPage />}> {/* Это основной, родительский роут */}

      {/* Домашняя страница, главная */}
      <Route index element={<HomePage />} /> {/* index используется для того, чтобы обозначить страницу по-умолчанию */}

      {/* Вкладка about */}
      <Route path="about" element={<AboutPage />} />

      {/* Вкладка с определённым фильмом, его детали */}
      <Route
        path="films/:id" /* ":id" используется для того, чтобы обозначить динамический сегмент, к которому мы можем потом обратиться через Use Params. Данный параметр нам поможет отобразить детали одного конкретного фильма, в зависимости от переданного идентификатора */
        element={<FilmDetails />} 
        loader={filmLoader}
      >
        <Route index element={<FilmDirector />} loader={filmLoader} /> {/* Компонент об авторе */}
        <Route path="critics" element={<FilmCritics />} loader={filmLoader} /> {/* Компонент с критикой фильма */}
      </Route>

      {/* Страница авторизации пользователя */}
      <Route
        path="films/:id/start-show"  /* ":id" используется для того, чтобы обозначить динамический сегмент, к которому мы можем потом обратиться через Use Params. Данный параметр нам поможет отобразить детали одного конкретного фильма, в зависимости от переданного идентификатора */
        element={<StartShowPage />}
        action={startShowAction} // Вызывается тогда, когда форма отправляется не-get запросом (post, put, patch, delete). Действие подтверждения авторизации
      />

      {/* Страница с фильмами */}
      <Route
        path="films"
        fallbackElement={<Loader />} // fallbackElement (колесо загрузки) отображается, пока загружается роутер
        lazy={() => // Используя свойство lazy, можно пробросить функцию для асинхронного получения компонента и его данных, позволяет ускорить первоначальную загрузку сайта и производительность
          import("./pages/FilmsPage").then((module) => ({ // Импорт страницы с фильмами
            Component: module.FilmsPage,
            loader: module.filmsLoader,
          }))
        }
      />

      {/* Страница пользователя */}
      <Route
        path={ROUTES.user}
        element={
          /* Если isAllowed={true}, то на странице http://192.168.0.101:3000/user будет отображен компонент UserPage */
          <ProtectedRoute isAllowed={false}> 
            <UserPage />
          </ProtectedRoute>
        }
      />

    <Route path="/film-show/:id" element={<FilmShowPage />} />

      {/* Cтраница с ошибкой, если после слэша всякая фигня. "*" означает, что может быть любой путь и любая вложенность */}
      <Route path="*" element={<ErrorPage />} /> 
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default App;
