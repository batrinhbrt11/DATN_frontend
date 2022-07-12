import styled from "styled-components";

export const AdminContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const Navigation = styled.div`
  position: fixed;
  width: 300px;
  height: 100%;
  background: var(--blue);
  border-left: 10px solid var(--blue);
  transition: 0.5s;
  overflow: hidden;
  & ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    & li {
      position: relative;
      width: 100%;
      margin-bottom: 10px;
      list-style: none;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      &:hover,
      &.hovered {
        background-color: var(--white);
      }
      &:nth-child(1) {
        margin-bottom: 40px;
        pointer-events: none;
      }
      & a {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: var(--white);
        & .icon {
          position: relative;
          display: block;
          min-width: 40px;
          height: 40px;
          text-align: center;
        }
        & .title {
          font-size: 1.5rem;
          font-weight: 700;
          position: relative;
          display: block;
          padding: 0 10px;
          height: 60px;
          line-height: 60px;
          text-align: start;
          white-space: nowrap;
        }
      }
      &:hover a,
      &.hovered a {
        color: var(--blue);
      }
      &:hover a::before,
      &.hovered a::before {
        content: "";
        position: absolute;
        right: 0;
        top: -50px;
        width: 50px;
        height: 50px;
        background-color: transparent;
        border-radius: 50%;
        box-shadow: 35px 35px 0 10px var(--white);
        pointer-events: none;
      }
      &:hover a::after,
      &.hovered a::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: -50px;
        width: 50px;
        height: 50px;
        background-color: transparent;
        border-radius: 50%;
        box-shadow: 35px -35px 0 10px var(--white);
        pointer-events: none;
      }
    }
  }
  @media (max-width: 1200px) {
    ${(props) => (props.showNav !== true ? `display:none` : null)}
  }
`;
export const Main = styled.div`
  position: absolute;
  width: calc(100% - 300px);
  left: 300px;
  min-height: 100vh;
  background: var(--white);
  transition: 0.5s;
  &.active {
    width: calc(100% - 80px);
    left: 80px;
  }
  @media (max-width: 1200px) {
    ${(props) =>
      props.showNav !== true
        ? `  width: 100% ;
    left: 0;`
        : null}
  }
`;
export const TopBar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
export const Toggle = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  cursor: pointer;
  display: none;
  @media (max-width: 1200px) {
    display: block;
  }
`;
export const Search = styled.div`
  position: relative;
  width: 400px;
  margin: 0 10px;
  & label input {
    width: 100%;
    height: 40px;
    border-radius: 40px;
    padding: 5px 20px;
    padding-left: 35px;
    font-size: 18px;
    outline: none;
    border: 1px solid var(--black2);
  }
  & label .ion-icon {
    position: absolute !important;
    top: 0 !important;
    left: 10px !important;
    font-size: 1.2rem !important;
  }
`;
export const CardBox = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const CardNumber = styled.div`
  position: relative;
  font-weight: 700;
  font-size: 2.5rem;
  color: var(--blue);
`;
export const CardName = styled.div`
  color: var(--black2);
  font-size: 1.5rem;
  margin-top: 5px;
`;
export const Card = styled.div`
  position: relative;
  background: var(--white);
  padding: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
`;
export const Details = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 30px;
  @media (max-width: 1850px) {
    display: block;
  }
`;
export const TableContainer = styled.div`
  position: relative;
  min-height: 500px;

  background: var(--white);
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  margin: 30px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
      width: 5px;
    }
  @media (max-width: 800px) {
    margin: 0;
    width: 100%;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
  }
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  & h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--blue);
  }
  & a {
    position: relative;
    padding: 5px 10px;
    background: var(--blue);
    text-decoration: none;
    color: var(--white);
    border-radius: 6px;
    font-weight: 700;
    font-size: 1.5rem;
  }
  @media (max-width: 700px) {
    display: block;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
  padding: 20px;
`;
export const SelectBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
  & > span {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }
`;
export const ButtonBox = styled.div`
  margin-bottom: 15px;
  margin-top: 15px;
  width: 100%;
  & input[type="submit"],
  & button {
    width: 100%;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    padding: 10px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #f9a392;
  }
  & button {
    width: 100%;
    padding: 10px;
  }
`;
export const InputBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
  & span {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }
  & p {
    font-size: 1.5rem;
    color: #df0029d9;
  }
  & input {
    height: 45px;
    width: 100%;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1px solid #ccc;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
    &:focus,
    &:valid {
      border-color: #dfdfdf;
    }
  }

  @media (max-width: 584px) {
    margin-bottom: 15px;
    width: 100%;
  }
`;
