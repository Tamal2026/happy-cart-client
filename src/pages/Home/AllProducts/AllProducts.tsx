import { useEffect, useState } from "react";
import "../../../index.css";
interface Product {
  name: string;
  price: number;
  img: string;
}

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:5000/all-products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className=" w-[1400px] gap-4 mx-auto">
      <div className="flex items-center justify-evenly mr-12 ">
        <h1 className="text-3xl my-8 font-medium justify-start">
          Shop Our Products
        </h1>
        <div>
          <button className="btn btn-outline btn-success hover:text-white mr-5">
            All Products
          </button>
          <button className="btn btn-outline btn-primary mr-5">Vegetables</button>
          <button className="btn btn-outline btn-secondary mr-5">Fruits</button>
          <button className="btn btn-outline btn-warning mr-5">Meat</button>
        </div>
      </div>
      {loading ? (
        <>
          <h1>Please Wait...</h1>
          <span className="loading loading-bars loading-lg"></span>
        </>
      ) : (
        <div className="grid grid-cols-4 ">
          {allProducts.map((product, index) => (
            <div
              key={index}
              className="card hover:shadow-2xl h-96 w-80 bg-transparent shadow-xl glass"
              style={{
                backdropFilter: "blur(1spx)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <figure className="all-products-zoom-img">
                <img className="h-60" src={product.img} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="font-semibold"> ${product.price}/ kg</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary font-bold text-md"> Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
