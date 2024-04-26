import React from "react";

const Read = ({ products, onBackClick }) => {
  return (
    <div className="col-span-9 mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Products ({products.length})
        </h2>
        <button onClick={onBackClick} className="btn btn-primary">
          Back to Home
        </button>
      </div>
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

export default Read;
