import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  return (
    <Carousel fade={true} pause={false} id="header-carousel">
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="img/carousel-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h6>Spa & Beauty Center</h6>
          <h3>Massage Treatment</h3>
          <p>
            Lorem rebum magna dolore amet lorem eirmod magna erat diam stet.
            Sadips duo stet amet amet ndiam elitr ipsum labore diam
          </p>
          <button     onClick={() => navigate("/book")}>MAKE APPOINTMENT</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="img/carousel-3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h6>Spa & Beauty Center</h6>
          <h3>Facial Treatment</h3>
          <p>
            Lorem rebum magna dolore amet lorem eirmod magna erat diam stet.
            Sadips duo stet amet amet ndiam elitr ipsum labore diam
          </p>
          <button onClick={() => navigate("/book")} >MAKE APPOINTMENT</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="img/carousel-2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h6>Spa & Beauty Center</h6>
          <h3>Cellulite Treatment</h3>
          <p>
            Lorem rebum magna dolore amet lorem eirmod magna erat diam stet.
            Sadips duo stet amet amet ndiam elitr ipsum labore diam
          </p>
          <button onClick={() => navigate("/book")}>MAKE APPOINTMENT</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
