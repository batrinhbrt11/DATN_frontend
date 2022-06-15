import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./style.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Item from "./Item";
const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon style={{ color: "#f9a392", fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon
        style={{
          color: "#f9a392",
          fontSize: "30px",
        }}
      />
    </div>
  );
};
const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 3,
  infinite: true,
  autoplaySpeed: 1000,
  // slidesToScroll={3}
  centerMode: true,
  autoplay: true,
  centerPadding: "170px",
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};
export default function index() {
  const multiData = [
    {
      id: 1,
      img: "img/service-1.jpg",
      title: "Body Massage",
      cap: "Elitr labore sit dolor erat est lorem diam sea ipsum diam dolor duo sit ipsum",
    },
    {
      id: 2,
      img: "img/service-2.jpg",
      title: "Stone Therapy",
      cap: "Elitr labore sit dolor erat est lorem diam sea ipsum diam dolor duo sit ipsum",
    },
    {
      id: 3,
      img: "img/service-3.jpg",
      title: "Facial Therapy",
      cap: "Elitr labore sit dolor erat est lorem diam sea ipsum diam dolor duo sit ipsum",
    },
    {
      id: 4,
      img: "img/service-4.jpg",
      title: "Skin Care",
      cap: "Elitr labore sit dolor erat est lorem diam sea ipsum diam dolor duo sit ipsum",
    },
    {
      id: 5,
      img: "img/service-5.jpg",
      title: "Stream Bath",
      cap: "Elitr labore sit dolor erat est lorem diam sea ipsum diam dolor duo sit ipsum",
    },
    {
      id: 6,
      img: "img/service-6.jpg",
      title: "Face Masking",
      cap: "Elitr labore sit dolor erat est lorem diam sea ipsum diam dolor duo sit ipsum",
    },
  ];
  return (
    <div
      style={{ margin: "30px", textAlign: "center", paddingTop: "50px" }}
      className="carousel"
    >
      <h6 className="d-inline-block text-primary text-uppercase bg-light py-1 px-2 h6">
        Our Services
      </h6>
      <h1>Spa & Beauty Services</h1>
      <Slider {...carouselProperties}>
        {multiData.map((item) => (
          <Item key={item.id} image={item} />
        ))}
      </Slider>
    </div>
  );
}
