import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import NavBar from "./Navbar";
import "./style/home.style.css";

export default function HomePage() {
  useEffect(() => {
    document.getElementsByClassName("nav-link")[0].classList.add("active-page");

    const headings = document.getElementsByClassName("heading");
    headings[1].classList.add("bold-italic");

    let ratios = [0.42, 0.23, 0.33];
    for (let i = 0; i < headings.length; i++) {
      const containerSize = headings[i].clientWidth;
      headings[i].style.fontSize = `${(containerSize / 2) * ratios[i]}px`;
    }
  });

  return (
    <>
      <div style={{ width: "1px", height: "1px" }}></div>
      <NavBar />
      <div className="outer-container">
        <section className="heading-box">
          <h2 className="heading row-size">THE MOST</h2>
          <h2 className="heading row-size">SECURE BANKING</h2>
          <h2 className="heading row-size">SYSTEM EVER</h2>
          <div className="row-size btn-container">
            <Link to="/logs">
              <button className="check-btn">
                Check Logs
                <img src="./img/arrow.png" alt="right arrow" width={40} />
              </button>
            </Link>
          </div>
        </section>
        <div className="image">
          <img src="./img/card.png" alt="credit card" />
        </div>
      </div>
    </>
  );
}
