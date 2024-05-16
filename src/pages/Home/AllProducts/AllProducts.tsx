import { useEffect, useState } from "react";
import ShowAllProducts from "./ShowAllProducts";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    fetch("http://localhost:5000/all-products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      });
  },[]);
  return (
    <div>
     {
        loading ? (
            <p>
                Loading...
            </p>
        ) : (
            <ul>
                {
                    allProducts.map((product, index)=>(
                       <ShowAllProducts key={product._id} allProducts={allProducts}></ShowAllProducts>
                    ))
                }
            </ul>
        )
     }
    </div>
  );
};

export default AllProducts;
