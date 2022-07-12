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

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 5px 0;
  height: 350px;
  overflow-y: scroll;
  @media (max-width: 584px) {
    max-height: 280px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1; 
    }
    &::-webkit-scrollbar-thumb {
      background: #888; 
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
  }
`;
export const ItemCard = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
  color: #000;
  height: 120px;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  border: .5px solid #f9a392;
  justify-content: space-between;
  @media (max-width: 960px) {
    margin-bottom: 15px;
    width: 100%;
  }
`;
export const CardContent = styled.div``;
