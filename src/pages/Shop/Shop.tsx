import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosPublic = useAxiosPublic();
  const productsPerPage = 6;

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-products");
      return res.data;
    },
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Filter products based on selected category or show all products
  const currentProducts = selectedProduct
    ? products.filter((product) => product.category === selectedProduct).slice(
        indexOfFirstProduct,
        indexOfLastProduct
      )
    : products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOptionChange = (e) => {
    setSelectedProduct(e.target.value === "allProducts" ? null : e.target.value);
  };

  return (
    <>
      <div
        className="bg-cover bg-center w-full mt-8 h-44 flex justify-center items-center"
        style={{
          backgroundImage:
            'url("https://i.ibb.co/cvFhWC0/cart-page-header-img.jpg")',
          opacity: "0.7",
          backgroundColor: "black",
        }}
      >
        <h1 className="text-white text-4xl font-bold">Welcome to our Shop</h1>
      </div>
      <div className="flex max-w-screen-2xl mx-auto items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-4 py-2 w-full pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></div>
        </div>

        <div className="mr-2">
          <select
            className="border rounded-md px-4 py-2 w-full mt-4"
            onChange={handleOptionChange}
          >
            <option value="allProducts">All Products</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruits">F
            ruit</option>
            <option value="meat">Meat</option>
          </select>
        </div>
      </div>

      <div className="grid max-w-screen-2xl mx-auto grid-cols-5 mt-6">
        <div className="col-span-1 category">
          <h1 className="text-xl font-serif font-semibold mb-5">Categories</h1>
          <div className="flex items-center">
            <input
              type="radio"
              name="food"
              id="allProducts"
              value="allProducts"
              checked={selectedProduct === "allProducts"}
              onChange={handleOptionChange}
              className="mr-2 p-2"
            />
            <label
              htmlFor="allProducts"
              className="text-red-500 font-semi-bold text-xl"
            >
              All Products
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="food"
              id="Vegetable"
              value="Vegetable"
              checked={selectedProduct === "Vegetable"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label
              htmlFor="vegetable"
              className="text-green-400 font-semi-bold text-xl"
            >
              Vegetable
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="food"
              id="Fruits"
              value="Fruits"
              checked={selectedProduct === "Fruits"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label
              htmlFor="fruit"
              className="font-bold text-xl my-1 text-amber-400"
            >
              Fruit
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="food"
              id="meat"
              value="meat"
              checked={selectedProduct === "meat"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label
              htmlFor="meat"
              className="text-fuchsia-500 font-bold text-xl"
            >
              Meat
            </label>
          </div>
        </div>

        <div className="col-span-4">
          <div className="grid grid-cols-3 gap-y-5">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="card bg-transparent-glass w-5/6 h-96 hover:shadow-gray-500 shadow-2xl bg-base-100 col-span-1 bg-opacity-75"
              >
                <figure>
                  <img
                    className="h-[250px] w-full"
                    src={product.img}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p className="font-bold">${product.price}/kg</p>
                  <div className="card-actions justify-end">
                    <button className="btn text-xl bg-sky-500 text-white font-bold">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pagination flex justify-center my-4">
        <button
          className="mx-2 px-3 py-1 bg-purple-600 font-semibold text-white rounded"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(products.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              className={`mx-2 px-3 py-1 ${
                currentPage === i + 1
                  ? "bg-blue-500  text-white rounded"
                  : "bg-gray-200"
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          className="mx-2 px-3 py-1 bg-blue-500 font-semibold text-white rounded"
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Shop;
