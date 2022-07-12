import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/cusAuthSlice";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "./api";
export default function () {
  const [signIn, setSignIn] = useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorPassword, setErrorPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (data) => {
    const res = await adminLogin(data);
    if (res.status === 200) {
      dispatch(login(res.data));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/admin");
      window.location.reload();
    } else if (res.status === 404) {
      setErrorPassword(res.data);
    }
  };
  return (
    <BigContainer>
      <Container>
        <BlueBg>
          <SingInContainer></SingInContainer>
          <SignUpContainer>
            <Title>Login to Admin Dashboard</Title>
          </SignUpContainer>
        </BlueBg>
        <FormBx signIn={signIn}>
          <SignInForm signIn={signIn}>
            <form onSubmit={handleSubmit(onLogin)}>
              <h3>Login to Dashboard</h3>
              <p>{errorPassword}</p>
              <input
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Name is not empty",
                })}
              />
              <p>{errors.username?.message}</p>
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
            </form>
          </SignInForm>
        </FormBx>
      </Container>
    </BigContainer>
  );
}

const BigContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  height: 100vh;
  background: #f9a392;
  width: 100%;
  transition: 0.5s;
  @media (max-width: 991px) {
  }
`;
const Container = styled.div`
  position: relative;
  width: 1000px;
  height: 800px;
  margin: 20px;
  @media (max-width: 991px) {
    max-width: 400px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const BlueBg = styled.div`
  position: absolute;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 720px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
  @media (max-width: 991px) {
    top: 0;
    height: 100%;
  }
`;

const SingInContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 991px) {
    position: absolute;
    width: 100%;
    height: 150px;
    bottom: 0;
    top: 0;
  }
`;

const SignUpContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  @media (max-width: 991px) {
    position: absolute;
    width: 100%;
    height: 150px;
    bottom: 0;
  }
`;
const Title = styled.h2`
  text-align: center;
  color: #fff;
  font-size: 3rem;
  font-weight: 500px;
  margin-bottom: 10px;
`;
const SignInBtn = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background: #fff;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  border: none;
`;
const SingUpBtn = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background: #fff;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  border: none;
`;
const FormBx = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: #fff;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
  transition: 0.5s ease-in-out;
  ${(props) => (props.signIn !== true ? `left:50%;` : null)}
  @media (max-width: 991px) {
    width: 100%;
    height: 550px;
    top: 0;
    box-shadow: none;
    ${(props) =>
      props.signIn !== true
        ? `left:0;
        top:150px;`
        : null}
  }
`;
const SignInForm = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  padding: 50px;
  transition: 0.5s;
  transition-delay: 0.25s;
  ${(props) =>
    props.signIn !== true ? `left:-100%; transition-delay: 0s;` : null}
  & form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  & form h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
    font-weight: 500;
  }
  & form input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    outline: none;
    font-size: 16px;
    border: 1px solid #333;
  }
  & form input[type="submit"] {
    background: #f9a392;
    border: none;
    color: #fff;
    max-width: 100px;
    cursor: pointer;
  }
  & form a {
    color: #333;
  }
  & form p {
    font-size: 1.5rem;
    color: #df0029d9;
  }
`;

const SignUpForm = styled.div`
  position: absolute;
  left: 100%;
  width: 100%;
  padding: 50px;
  transition: 0.5s;
  transition-delay: 0s;
  ${(props) =>
    props.signIn !== true ? `left:0; transition-delay: 0.25s;` : null}
  & form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  & form h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
    font-weight: 500;
  }
  & form input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    outline: none;
    font-size: 16px;
    border: 1px solid #333;
  }
  & form input[type="submit"] {
    background: #f9a392;
    border: none;
    color: #fff;
    max-width: 100px;
    cursor: pointer;
  }
  & form a {
    color: #333;
  }
`;
