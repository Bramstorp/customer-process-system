import { useNavigate } from "react-router";
import { fetchToken, setToken } from "../auth/Auth";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (username == "" && password == "") {
      return;
    } else {
      axios
        .post(`http://localhost:8000/login`, {
          username: username,
          password: password,
        })
        .then(function (res) {
          if (res.data.token) {
            setToken(res.data.token);
            navigate("/config");
          }
        })
        .catch(function (error) {
          alert(error.response.data);
          console.log(error, "error");
        });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => login()}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
