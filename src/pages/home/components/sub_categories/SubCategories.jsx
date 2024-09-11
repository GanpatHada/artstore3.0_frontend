import React from "react";
import "./SubCategories.css";
const SubCategories = ({ heading, productsArray }) => {
  console.log(productsArray)  
  return (
    <div className="sub-categories">
      <h2>{heading}</h2>
      <div className="sub-categories-items">
        <div>
          <section className="image-section">
            <img src={productsArray[0].imageUrl} alt="" />
          </section>
          <section className="info-section">{productsArray[0].title}</section>
        </div>
        <div>
          <section className="image-section">
            <img src={productsArray[1].imageUrl} alt="" />
          </section>
          <section className="info-section">{productsArray[1].title}</section>
        </div>
        <div>
          <section className="image-section">
            <img src={productsArray[2].imageUrl} alt="" />
          </section>
          <section className="info-section">{productsArray[2].title}</section>
        </div>
        <div>
          <section className="image-section">
            <img src={productsArray[3].imageUrl} alt="" />
          </section>
          <section className="info-section">{productsArray[3].title}</section>
        </div>
      </div>
      <button className="secondary-text-btn">See more</button>
    </div>
  );
};

export default SubCategories;
