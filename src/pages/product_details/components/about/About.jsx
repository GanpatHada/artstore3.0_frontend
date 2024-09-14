import React from "react";
import "./About.css";
const About = () => {
  const aboutList = [
    "Lorem ipsum, dolor sit amet consectetur adipisicing Atque quibusdam ut ipsum",
    "Lorem ipsum, dolor sit amet consectetur adipisicing Atque quibusdam ut ipsum",
    "Lorem ipsum, dolor sit amet consectetur adipisicing Atque quibusdam ut ipsum",
    "Lorem ipsum, dolor sit amet consectetur adipisicing Atque quibusdam ut ipsum",
    "Lorem ipsum, dolor sit amet consectetur adipisicing Atque quibusdam ut ipsum",
  ];
  return (
    <section id="about-section">
      <h4>About this item</h4>
      <ul>
      {aboutList.map((aboutItem,index)=><li key={index}>{aboutItem}</li>)}
      </ul>
    </section>
  );
};

export default About;
