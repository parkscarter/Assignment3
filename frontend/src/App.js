import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import Home from "./Home";
import Read from "./Read";

function App() {
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);
  const [dbProducts, setDbProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState("home"); // Track current page

  useEffect(() => {
    // Fetch products when the component mounts
    fetch("http://localhost:8081/products")
      .then((response) => response.json())
      .then((products) => {
        console.log("New Products: ", products);
        setDbProducts(products); // Update products state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const renderProducts = () => {
    return (
      <Read
        products={dbProducts}
        onBackClick={() => setCurrentPage("home")} // Switch to home page on back click
      />
    );
  };

  const renderPage = () => {
    if (currentPage === "home") {
      return <Home onBrowseClick={() => setCurrentPage("read")} />;
    } else if (currentPage === "read") {
      return renderProducts();
    }
  };

  return (
    <div className="flex fixed flex-row">
      <div
        className="h-screen bg-slate-800 p-3 xl:basis-1/5"
        style={{ minWidth: "65%" }}
      >
        <div className="px-6 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white">
            {" "}
            Product Catalog App{" "}
          </h1>
          <p className="text-gray-700 text-white">
            by - <b style={{ color: "orange" }}>Carter Parks, Jacob Mashol</b>
          </p>
        </div>
      </div>

      <div className="ml-5 p-10 xl:basis-4/5">{renderPage()}</div>
    </div>
  );
}

export default App;
