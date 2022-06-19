import React, { useState } from "react";
import {
  BigContainer,
  Container,
  BlueBg,
  SingInContainer,
  SignInBtn,
  SignUpContainer,
  SingUpBtn,
  Title,
  FormBx,
  SignInForm,
  SignUpForm,
} from "./styled";
export default function () {
  const [signIn, setSignIn] = useState(true);
  return (
    <BigContainer>
      <Container>
        <BlueBg>
          <SingInContainer>
            <Title>Already Have an Account?</Title>
            <SignInBtn onClick={() => setSignIn(true)}>Sign in</SignInBtn>
          </SingInContainer>
          <SignUpContainer>
            <Title>Don't Have an Account?</Title>
            <SingUpBtn onClick={() => setSignIn(false)}>Sign up</SingUpBtn>
          </SignUpContainer>
        </BlueBg>
        <FormBx signIn={signIn}>
          <SignInForm signIn={signIn}>
            <form>
              <h3>Sign In</h3>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <input type="submit" value="Login" />
              <a href="#">Forgot Password</a>
            </form>
          </SignInForm>
          <SignUpForm signIn={signIn}>
            <form>
              <h3>Sign Up</h3>
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <input type="date"></input>
              <input type="submit" value="Register" />
              <a href="#">Forgot Password</a>
            </form>
          </SignUpForm>
        </FormBx>
      </Container>
    </BigContainer>
  );
}
