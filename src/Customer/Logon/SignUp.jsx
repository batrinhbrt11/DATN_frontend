import React, { useState } from "react";
import { SignUpForm } from "./styled";
import { useForm } from "react-hook-form";
import { customerRegister } from "./api";
export default function SignUp({ signIn }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorPassword, setErrorPassword] = useState("");
  const onRegister = async (data) => {
    if (data.password !== data.rePassword) {
      return setErrorPassword("Password and Confirm Password doesn't match");
    }
    const res = await customerRegister(data);
    if (res !== true) {
      setErrorPassword(res);
    }
  };
  return (
    <SignUpForm signIn={signIn}>
      <form onSubmit={handleSubmit(onRegister)}>
        <h3>Sign Up</h3>
        <p>{errorPassword}</p>
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is not empty",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Email format is incorrect",
            },
          })}
        />
        <p>{errors.email?.message}</p>
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
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is not empty",
          })}
        />
        <p>{errors.name?.message}</p>
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
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("rePassword", {
            required: "Password is not empty",
            minLength: {
              value: 6,
              message: "A minimum password length greater than 6",
            },
          })}
        />
        <p>{errors.rePassword?.message}</p>
        <input
          type="date"
          placeholder="Birthday"
          {...register("birthday")}
        ></input>
        <input type="submit" value="Register" />
      </form>
    </SignUpForm>
  );
}
