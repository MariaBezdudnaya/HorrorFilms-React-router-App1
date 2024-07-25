//Страница авторизации пользователя:
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { mockFetch } from "../utils/api";
import { Loader } from "../components/Loader";

export const startShowAction = async ({ params: { id }, request }) => { // В параметрах - id текущего фильма и request, который содержит данные формы
  const formData = await request.formData(); // await ждет выполнения промиса
  console.debug(formData); // также используется для вывода информации в консоль, но он предназначен специально для отладочных целей

  const filmDetails = await mockFetch(`/films/${id}`); // Получаем данные фильма, которые хотели посмотреть

  // Проверка поля name
  if (!formData.get("name")) { // Если не введено имя
    return json({ message: "Name field can't be empty" }, { status: 400 }); // То показывается ошибка. json - это утилита, которая конвертирует данные в json-формат
  }

  alert(`${formData.get("name")}, welcome to show "${filmDetails.title}" film!`); // Иначе алерт "Добро пожаловать на просмотр"

  // return redirect(`/films/${id}`); // И переход (с помощью функции redirect из "react-router-dom") обратно на страницу фильма
  return redirect(`/film-show/${id}`); // Перенаправление на новый маршрут с id фильма
};

export const StartShowPage = () => {
  const navigation = useNavigation(); // хук, который не принимает никаких параметров и возвращает одну функцию navigate , которую можно использовать для перенаправления пользователя на определенные страницы. В данном случае показывает, что наша форма при отправке сабмитится
  const data = useActionData(); // хук, который позволит нам вывести сообщение об ошибке
  return (
    <div className="start-show_container">
      <h1 className="start-show_title"> {/* Заголовок */}
        Start showing now!
      </h1>

      {navigation.state === "submitting" && <Loader />} {/* Состояние сабмита, показывается лоадер */}

      <Form method="post" className="start-show_form"> {/* Компонент Form позволяет перехватить нам запрос post с помощью роутера и совершить action. Form - обёртка над for HTML-элементом, которая позволяет выполнять мутации данных, используя HTML и HTTP семантику */}
        <div>
          <input // инпут для имени
            className="form-input"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
        </div>
        {data?.message && <p className="error-validation">{data.message}</p>} {/* Сообщение об ошибке валидации name */}
        
        <div>
          <input // инпут для мэйла
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your email*"
          />
          
        </div>
        <p className="error-validation">*not reqired</p>
        
        <button className="button" type="submit">
          Start showing
        </button>
      </Form>
    </div>
  );
};
