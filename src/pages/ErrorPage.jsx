//Страница с ошибкой:
import { useAsyncError } from "react-router-dom"; // Возвращает значение отклонения от ближайшего компонента <Await>

const ERROR_CODES = { // Коды ошибок
  404: "Not found",
  401: "Not allowed",
  500: "Server error",
};

const errorIcon = ( // Иконка
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-64 h-64 text-slate-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
    />
  </svg>
);

export const ErrorPage = () => {
  const error = useAsyncError(); // Перехватывает ошибки, возвращает значение отклонения от ближайшего компонента <Await>

  return (
    <div className="flex flex-col items-center mt-40">
      {errorIcon}

      <div className="text-xl font-medium text-slate-700 mb-5">
        {ERROR_CODES[error?.status]} {/* Показывает статус ошибки */}
      </div>

      {error?.message && (
        <p className="text-slate-500 text-sm mb-10">{error.message}</p> // Показывает тип ошибки
      )}

      <p className="text-slate-500">Sorry for inconvenience!</p>
    </div>
  );
};
