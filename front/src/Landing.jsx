import React, { useState } from "react";
import images from "./utils/images";
import { TextField } from "@mui/material";
import { useLogin } from "./services/api/tanstack";
import toast from "react-hot-toast";
import useAuth from "./hooks/AuthStore";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [cred, setCred] = useState({
    staff_id: "",
    password: "",
  });

  const { mutate, isPending } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!cred.staff_id || !cred.password) {
      return toast.error("Complete the form!");
    }

    mutate(cred, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.message);
        login(data.user);
        navigate(data.redirectUrl);
      },
    });
  };

  return (
    <main className="h-screen w-full lg:grid grid-cols-5 overflow-hidden">
      {/* side image */}
      <section className="col-span-3 relative hidden lg:block">
        <img
          src={images.sideImage}
          alt=""
          className="w-full h-full object-cover absolute"
        />
        <div className="h-full bg-gradient-to-t from-black/75 t relative"></div>
      </section>

      {/* Side Auth Form */}
      <aside className="lg:col-span-2 flex items-center justify-center h-full">
        {/* Inner wrapper */}
        <div className="login_width">
          <p className="font-montserrat text-2xl font-bold text-gray-700">
            Sign In
          </p>
          <p className="text-xs mb-5">
            Let get you started now! Enter you credentails
          </p>

          <form onSubmit={handleLogin} className="w-full">
            <TextField
              fullWidth
              variant="standard"
              label="Staff Code*"
              placeholder="Enter your staff code here. ***************"
              value={cred.staff_id}
              onChange={(e) => setCred({ ...cred, staff_id: e.target.value })}
              sx={{ mb: 3 }}
              disabled={isPending}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Key*"
              type="password"
              placeholder="***************"
              value={cred.password}
              onChange={(e) => setCred({ ...cred, password: e.target.value })}
              sx={{ mb: 4 }}
              disabled={isPending}
            />

            <div>
              <button className="mb-6 text-xs font-medium" type="submit">
                Forgot Password?
              </button>
            </div>

            <button
              className="w-full text-white py-4 bg-primary disabled:bg-gray-500"
              disabled={isPending}
            >
              {isPending ? "Please wait.." : "Access"}
            </button>
          </form>
          <p className="text-center pt-7 text-xs italic text-gray-400">
            Npunto Technologies
          </p>
        </div>
      </aside>
    </main>
  );
}
