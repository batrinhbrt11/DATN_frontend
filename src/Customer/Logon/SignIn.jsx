import React, { useState } from "react";
import { SignInForm } from "./styled";
import { useForm } from "react-hook-form";
import { customerLogin } from "./api";
import { useDispatch } from "react-redux";
import { login } from "../../redux/cusAuthSlice";
import { useNavigate } from "react-router-dom";
export default function SignIn({ signIn }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorPassword, setErrorPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogin = async (data) => {
    const res = await customerLogin(data);
    if (res.status === 200) {
      dispatch(login(res));
      localStorage.setItem("token", JSON.stringify(res.token));
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
      window.location.reload();
    } else if (res.status === 404) {
      setErrorPassword(res.message);
    }
  };
  return (
    <SignInForm signIn={signIn}>
      <form onSubmit={handleSubmit(onLogin)}>
        <h3>Sign In</h3>
        <p>{errorPassword}</p>
        <input
          type="text"
          placeholder="Phone number"
          {...register("phoneNumber", {
            required: "Phone Number is not empty",
            pattern: {
              value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
              message: "Phone Number format is incorrect",
            },
          })}
        />
        <p>{errors.phoneNumber?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is not empty",
            minLength: {
              value: 6,
              message: "A minimum password length greater than 6",
            },
          })}
        />
        <p>{errors.password?.message}</p>
        <input type="submit" value="Login" />
        <a href="#">Forgot Password</a>
      </form>
    </SignInForm>
  );
}
