import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const PublicRoute = ({ element }) => {
  const token = getToken();
  return token ? <Navigate to="/" /> : element;
};

export default PublicRoute;