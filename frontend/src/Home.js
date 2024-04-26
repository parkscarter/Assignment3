import React from "react";

const Home = ({ onBrowseClick }) => {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <button onClick={onBrowseClick} className="btn btn-primary">
        Browse Products
      </button>
    </div>
  );
};

export default Home;
