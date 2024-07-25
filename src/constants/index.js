export const ROUTES = { // Роуты
  homePage: "/",
  about: "/about",
  films: "/films",
  user: "/user",
  filmDetails: "/films/:id",
  startShow: "/films/:id/start-show",
  filmShow: "/film-show/:id",

};

export const NAV_ITEMS = [ // Элементы меню-навигации
  {
    title: "Home",
    path: ROUTES.homePage,
  },
  {
    title: "About",
    path: ROUTES.about,
  },
  {
    title: "Films",
    path: ROUTES.films,
  },
];
