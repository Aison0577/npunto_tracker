import toast from "react-hot-toast";



export const getErrorMessage = (error) => {
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message || "Something went wrong";

  if (status === 401) {
    window.location.href = "/";
  }

  return new Error(message);
};





// export const getErrorMessage = (error) => {
//     if(error.response.status !== 401)
//     {
//         if (error.response) {
//           // Server responded with error status (4xx, 5xx)
//           const message = error.response.data?.message || "Request failed";
//           // return new Error(`${message} (Status: ${error.response.status})`);
//           return new Error(`${message}`);
//         }
//         if (error.request) {
//           // Request was made but no response received
//           return new Error("Network error - please check your connection");
//         }
//         // Other errors
//         console.log(error.message);
        
//         return new Error(error.message || "Unknown error occurred");
//     }
//   };
  
  