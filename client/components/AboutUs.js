import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

const AboutUs = () => (
  <Jumbotron>
    <h3>About Us</h3>
    <p>
      eGreetr is an eCard maker with an automatic text-generating feature. It
      was devloped for our team's Capstone project at the Grace Hopper Program
      at Fullstack Academy. <br />
      Github:{' '}
      <a href="https://github.com/capstone-hecate/eGreetr">
        <img src="github.png" className="logo-img" />
      </a>
    </p>

    <h5>Our Team</h5>
    <ul>
      <li>
        Anat Hochberg
        <a href="https://github.com/ahoch10">
          <img src="github.png" className="logo-img" />
        </a>
        <a href="https://www.linkedin.com/in/anathochberg/">
          <img src="linkedin.png" className="logo-img" />
        </a>
      </li>
      <li>
        Ari Kamarchevakul
        <a href="https://github.com/snowbearypie">
          <img src="github.png" className="logo-img" />
        </a>
        <a href="https://www.linkedin.com/in/ari-kamarchevakul-462703126/">
          <img src="linkedin.png" className="logo-img" />
        </a>
      </li>
      <li>
        Jessica Lee
        <a href="https://github.com/jlee546">
          <img src="github.png" className="logo-img" />
        </a>
        <a href="https://www.linkedin.com/in/jessica-lee546/">
          <img src="linkedin.png" className="logo-img" />
        </a>
      </li>
    </ul>
  </Jumbotron>
)

export default AboutUs
