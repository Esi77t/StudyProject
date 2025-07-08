import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, children }) => {
    
    const location = useLocation();

    if(!isLoggedIn) {
        return(
            <Navigate to="/login" replace state={{ message: "로그인 후 이용해주세요.", from: location.pathname }} />
        );
    }

    return children;
}

export default PrivateRoute;