import toast from "react-hot-toast";
import useAuth from "../../hooks/AuthStore";



export const getErrorMessage = (error) => {
  const { logout } = useAuth()
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message || "Something went wrong";

  if (status === 401) {
    logout()
    window.location.href = "/";
  }

  return new Error(message);
};



