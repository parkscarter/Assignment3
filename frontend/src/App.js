import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [dbProducts, setDbProducts] = useState([]);

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

  const renderProducts = (products) => {
    console.log("Rendering:", products);
    return (
      <div className="col-span-9 mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Products ({products.length})
        </h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {/* Loop Products */}
          {products.map((product, index) => (
            <div key={index}>
              <div className="card shadow-sm">
                <img
                  alt="Product Image"
                  src={product.image}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.title}
                      </span>
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Rating: {product.rating.rate}
                  </p>
                </div>
                <p className="text-sm font-medium text-green-600">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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

      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log("Before render :", dbProducts.length)}
        {renderProducts(dbProducts)}
      </div>
    </div>
  );
};

export default App;
