import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
  color: rgb(249, 163, 146);
  @media (max-width: 584px) {
    max-height: 290px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
  }
`;
export const Column = styled.div`
  float: left;
  width: 50%;
  padding: 10px;
  @media screen and (max-width: 868px) {
    width: 100%;
  }
`;
export const Form = styled.div`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.4px);
  -webkit-backdrop-filter: blur(3.4px);
  border: 1px solid rgba(34, 34, 34, 0.3);
  background: #fff;
`;
export const ContentContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  background-color: #fff;
  padding: 10px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  height: 400px;
`;
