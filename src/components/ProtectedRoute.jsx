import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children, isAllowed}) => {

    if (!isAllowed) return <Navigate to="/" /> // если пользователю недоступна страница, то он будут переведён на компонент, который возвращает на главную страницу
    
    return children // либо возвращается то, что обёрнуто в данный компонент
}