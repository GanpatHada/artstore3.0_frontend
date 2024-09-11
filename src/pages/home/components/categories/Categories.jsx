import React from "react";
import "./Categories.css";
import demoImage1 from "../../../../images/Buddha.jpg";
import poster2 from "../../../../images/artstore_poster2.svg";
import SubCategories from "../sub_categories/SubCategories";

const productsArray=[
  {
    imageUrl:'https://i.pinimg.com/236x/d8/a6/2a/d8a62aa79f423d50bbb7460d6683d3e8.jpg',
    title:'Demo1...'
  },
  {
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsb3VhmPQTUpFaUF5nD0GJlyiuNJVROTz_w&s',
    title:'Demo2...'
  },
  {
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0c8ra6ryBbCIE-_BkalstlUppVFLveAYqtQ&s',
    title:'Demo3...'
  },
  {
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8M5JkksPMBVucFKPp5NXz-wDNHhb7ql2eQQ&s',
    title:'Demo4...'
  }
]

const Categories = () => {
  return (
    <section id="categories">
       <SubCategories heading={"Pick up where you left Off"} productsArray={productsArray}/>   
       <SubCategories heading={"Products under ₹1000"} productsArray={productsArray}/>   
       <SubCategories heading={"Deal of the day"} productsArray={productsArray}/>   
       <SubCategories heading={"New Arrival"} productsArray={productsArray}/>   
       <SubCategories heading={"Pick up where you left Off"} productsArray={productsArray}/>   
       <SubCategories heading={"Pick up where you left Off"} productsArray={productsArray}/>   
       <SubCategories heading={"Pick up where you left Off"} productsArray={productsArray}/>   
       <SubCategories heading={"Pick up where you left Off"} productsArray={productsArray}/>   
    </section>
  );
};
export default Categories;
