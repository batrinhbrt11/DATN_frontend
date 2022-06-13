import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
import {
  BsFillGeoAltFill,
  BsFillTelephoneFill,
  BsFillEnvelopeFill,
  BsChevronRight,
} from "react-icons/bs";

export default function () {
  return (
    <div
      className="footer container-fluid position-relative bg-dark py-5"
      style={{ marginTop: "90px" }}
    >
      <Container className="footer-container">
        <Row>
          <Col>
            <h1 className="spa_title">
              SPA <span>Center</span>
            </h1>
            <p>
              Aliquyam sed elitr elitr erat sed diam ipsum eirmod eos lorem
              nonumy. Tempor sea ipsum diam sed clita dolore eos dolores magna
              erat dolore sed stet justo et dolor.
            </p>
            <Row>
              <span className="footer-info">
                <BsFillGeoAltFill /> 123 Street, New York, USA
              </span>
            </Row>
            <Row>
              <span className="footer-info">
                <BsFillTelephoneFill /> +012 345 67890
              </span>
            </Row>
            <Row>
              <span className="footer-info">
                <BsFillEnvelopeFill /> info@example.com
              </span>
            </Row>
          </Col>

          <Col>
            <Row>
              <Col>
                <h3>QUICK LINKS</h3>
                <a>
                  <BsChevronRight /> HOME
                </a>
                <br />
                <a>
                  <BsChevronRight /> ABOUT US
                </a>
                <br />
                <a>
                  <BsChevronRight /> OUR SERVICES
                </a>
                <br />
                <a>
                  <BsChevronRight /> OPEN HOURS
                </a>
                <br />
                <a>
                  <BsChevronRight /> SPA SPECIALIST
                </a>
              </Col>
              <Col>
                <h3>OUR SERVICES</h3>
                <a>Face Masking</a>
                <br />
                <a>Facial Therapy</a>
                <br />
                <a>Stream Bath</a>
                <br />
                <a>Skin care</a>
                <br />
                <a>Stone Therapy</a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
