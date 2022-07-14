import React from "react";
import "./style.css"
export default function () {
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6" style={{ minHeight: "500px" }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 open_img"
                src="img/opening.jpg"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-6 pt-5 pb-lg-5">
            <div className="hours-text bg-light p-4 p-lg-5 my-lg-5">
              <h6
                className="d-inline-block text-white text-uppercase bg-primary py-1 px-2"
                style={{ fontSize: "1.5rem" }}
              >
                Open Hours
              </h6>
              <h1 className="mb-4">Best Relax And Spa Zone</h1>
              <p style={{ fontSize: "1.5rem" }}>
                Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam
                dolore sed et. Sit rebum labore sit sit ut vero no sit. Et elitr
                stet dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat
                sed diam duo
              </p>
              <ul className="list-inline">
                <li className="h6 py-1">Mon – Fri : 9:00 AM - 7:00 PM</li>
                <li className="h6 py-1">Saturday : 9:00 AM - 6:00 PM</li>
                <li className="h6 py-1">Sunday : Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
