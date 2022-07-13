import React, { useState } from "react";
import { SignUpForm } from "./styled";
import { useForm } from "react-hook-form";
import { customerRegister } from "./api";
export default function SignUp({ signIn }) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [errorPassword, setErrorPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [errorDate,setErrorDate] = useState("");
  const isValidDay = (date) => {
    var birth = new Date(date)
    var now = new Date();
    var Difference_In_Time = now.getTime() - birth.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24 * 365);
    if (Difference_In_Days >= 16) {
      return true;
    }
    return false;
  };
  const onRegister = async (data) => {
    if (data.password !== data.rePassword) {
      return setErrorPassword("Password and Confirm Password doesn't match");
    }
    if(!isValidDay(data.birthday)){
      return setErrorDate("Your age must be over 16")
    }
    const res = await customerRegister(data);
    if (res !== true) {
      return setErrorPassword(res);
    }
    reset({
      email: "",
      name: "",
      phoneNumber: "",
      password: "",
      rePassword: "",
      birthday: new Date(),
    });
    setErrorPassword("");
    setSuccess("Successfully Register. Please Sign In!");
  };
  return (
    <SignUpForm signIn={signIn}>
      <form onSubmit={handleSubmit(onRegister)}>
        <h3>Sign Up</h3>
        <p>{errorPassword}</p>
        <p
          style={{
            color: "#1aed64",
          }}
        >
          {success}
        </p>
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
          onFocus={()=>setErrorDate("")}
          type="date"
          placeholder="Birthday"
          {...register("birthday")}
        ></input>
        <p>{errorDate}</p>
        <input type="submit" value="Register" />
      </form>
    </SignUpForm>
  );
}
