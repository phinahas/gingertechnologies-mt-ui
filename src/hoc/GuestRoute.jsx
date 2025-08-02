import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
  const user = useSelector((state) => state.userStore.user);
  

  if ( user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
