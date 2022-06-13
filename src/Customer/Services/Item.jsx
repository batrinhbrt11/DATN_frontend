import React from "react";
import styled from "styled-components";
const Caption = styled.div`
  color: #fff;
  z-index: 99;
  text-align: center;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  & h1 {
    font-size: 3rem;
  }
  & p {
    font-size: 1.5rem;
  }
`;
const Container = styled.div`
  height: 500px;
  position: relative;
  text-align: center;
  color: white;
  &:hover div {
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export default function Item({ image }) {
  return (
    <Container>
      <Image src={image.img} />
      <Caption>
        <h1>{image.title}</h1>
        <p>{image.cap}</p>
      </Caption>
    </Container>
  );
}
