import { useEffect, useState } from "react";
import "../../../index.css";
import { FaCartPlus } from "react-icons/fa";

interface Product {
  name: string;
  price: number;
  img: string;
  category: string;
}

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    fetch("http://localhost:5000/all-products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
     
      });
  }, []);

  const filterProductsByCategory = (category: string) => {
    setActiveCategory(category); // Set the active category
    if (category === "all") {
      const filtered = allProducts.reduce((acc: Product[], curr: Product) => {
        const index = acc.findIndex((item) => item.category === curr.category);
        if (index === -1) {
          acc.push(curr);
        } else if (acc.filter((item) => item.category === curr.category).length < 4) {
          acc.push(curr);
        }
        return acc;
      }, []);
      setFilteredProducts(filtered);
    } else {
      const filtered = allProducts.filter((product) => product.category === category)
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className=" w-[1400px] gap-4 mx-auto">
      <div className="flex items-center justify-evenly mr-12 ">
        <h1 className="text-3xl my-8 font-medium justify-start">Shop Our Products</h1>
        <div>
          <button className={`btn bg-amber-500 text-white  mr-5 ${activeCategory === "all" ? "active" : ""}`} onClick={() => filterProductsByCategory("all")}>All Products</button>
          <button className={`btn bg-emerald-500 text-white  mr-5 ${activeCategory === "Vegetable" ? "active" : ""}`} onClick={() => filterProductsByCategory("Vegetable")}>Vegetables</button>
          <button className={`btn text-white bg-cyan-500 mr-5 ${activeCategory === "Fruits" ? "active" : ""}`} onClick={() => filterProductsByCategory("Fruits")}>Fruits</button>
          <button className={`btn bg-rose-500 text-white  mr-5 ${activeCategory === "meat" ? "active" : ""}`} onClick={() => filterProductsByCategory("meat")}>Meat</button>
        </div>
      </div>
      {loading ? (
        <>
          <h1>Please Wait...</h1>
          <span className="loading loading-bars loading-lg"></span>
        </>
      ) : (
        <div className="grid grid-cols-4 gap-y-5">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="card hover:shadow-2xl h-96 w-80 bg-transparent shadow-xl glass"
              style={{
                backdropFilter: "blur(1spx)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <figure className="all-products-zoom-img">
                <img className="h-60 w-full" src={product.img} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="font-semibold"> ${product.price}/ kg</p>
                <div className="card-actions justify-end">
                  <button className=" btn-primary font-bold bg-orange-600 text-2xl p-3 rounded-lg text-white"> <FaCartPlus /></button>
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