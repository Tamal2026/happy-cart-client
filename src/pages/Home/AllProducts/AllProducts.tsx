import { useEffect, useState } from "react";
import '../../../index.css'
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
    <div>
      {loading ? (
        <>
          <h1>Please Wait...</h1>
          <span className="loading loading-bars loading-lg"></span>
        </>
      ) : (
        <div className="grid grid-cols-4 max-w-screen-2xl mx-auto">
          {allProducts.map((product, index) => (
            <div key={index} className="card w-80 h-[400px] bg-base-100 shadow-xl">
              <figure className="all-products-zoom-img">
                <img className="h-60 " src={product.img} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>Price: ${product.price}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary"> Buy Now</button>
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
