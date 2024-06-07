import {  useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Product {
  name: string;
  price: number;
  img: string;
  category: string;
  _id: string;
  email: string;
}

const BestSellerProducts = () => {

  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://happy-cart-server.vercel.app/best-seller-products")
      .then((res) => res.json())
      .then((data) => {
        setBestSellerProducts(data);
        setLoading(false);
      });
  }, []);


  return (
    <div className="my-10">
      <h1 className="text-5xl mt-8 font-bold text-gray-600 text-center">
        Our Bestseller Products
      </h1>
      <p className="text-center m-5">
        Discover the freshest picks in town! <br /> From farm-fresh veggies to
        juicy fruits and premium meats, our top sellers promise quality and
        taste in every bite.
      </p>
      <div className="max-w-screen-lg mx-auto">
        {loading ? (
         <span className="loading loading-bars loading-lg"></span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellerProducts.map((product, index) => (
              <div
                key={index}
                className="card bg-slate-100 h-80  hover:shadow-2xl"
              >
                <figure className="px-10 pt-10">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="rounded-xl mt-10 h-52"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-xl ">{product.name}</h2>
                  <hr />
                  <div className="card-actions">
                    <h1 className="font-semibold text-md text-gray-600">
                      ${product.price}/kg
                    </h1>
                  </div>
                </div>

                <div className="flex gap-x-4 text-xl mb-4 mx-auto ">
                  <FaStar className="checked text-green-600" />
                  <FaStar className="checked text-green-600" />
                  <FaStar className="checked text-green-600" />
                  <FaStar className="text-green-600" />
                  <FaStar />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellerProducts;
