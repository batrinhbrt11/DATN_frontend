import styled from "styled-components";

export const BigContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  background: #f9a392;
  width: 100%;
  transition: 0.5s;
`;
export const Container = styled.div`
  position: relative;
  width: 1000px;
  height: 1000px;
  margin: 20px;
  @media (max-width: 991px) {
    max-width: 400px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const BlueBg = styled.div`
  position: absolute;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 900px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
  @media (max-width: 991px) {
    top: 0;
    height: 100%;
  }
`;

export const SingInContainer = styled.div`
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

export const SignUpContainer = styled.div`
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
export const Title = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500px;
  margin-bottom: 10px;
`;
export const SignInBtn = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background: #fff;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  border: none;
`;
export const SingUpBtn = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background: #fff;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  border: none;
`;
export const FormBx = styled.div`
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
`;
export const SignInForm = styled.div`
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
`;

export const SignUpForm = styled.div`
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
