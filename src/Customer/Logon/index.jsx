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
} from "./styled";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
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
          <SignIn signIn={signIn} />
          <SignUp signIn={signIn} />
        </FormBx>
      </Container>
    </BigContainer>
  );
}
