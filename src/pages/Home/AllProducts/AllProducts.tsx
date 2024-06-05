import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus, FaRegPlusSquare } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";

import Swal from "sweetalert2";
import Modal from "react-modal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAdmin from "../../../hooks/useAdmin";

interface Product {
  name: string;
  price: number;
  img: string;
  category: string;
  _id: string;
  email: string;
  short_desc: string;
  ItemId: string;
  quantity: number;
}

const ProductModal = ({ product, isOpen, onRequestClose, handleAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-96  p-6">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <img
          className="h-56 w-full mb-4 object-cover"
          src={product.img}
          alt=""
        />
        <p className="mb-2">Category: {product.category}</p>
        <p className="mb-2">Price: ${product.price} / kg</p>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Quantity:
            <div className="flex items-center mt-2">
              <button className="btn btn-sm mr-2" onClick={decrementQuantity}>
                -
              </button>
              <input
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 py-1 w-16 text-center"
              />
              <button className="btn btn-sm ml-2" onClick={incrementQuantity}>
                +
              </button>
            </div>
          </label>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => handleAddToCart(product, quantity)}
            className="btn  text-white font-bold py-2 px-4 rounded bg-blue-500"
          >
            Add to Cart
          </button>
          <button
            onClick={onRequestClose}
            className="btn text-white font-bold py-2 px-4 rounded bg-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

const AllProducts = () => {
  const [, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useAdmin();
  const { user } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  const handleAddToCart = (product: Product, quantity) => {
    if (user && user.email) {
      const cartItem = {
        itemId: product._id,
        email: user.email,
        name: product.name,
        img: product.img,
        price: product.price,
        quantity: quantity,
      };

      axiosSecure
        .post("/cart", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            console.log(res.data)
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${product.name} has been added to the cart`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
            
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${product.name} is already in the cart`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
        });
    } else {
      // Handle case when user is not logged in
    }
  };

  const handleWishList = (product: Product) => {
    if (user && user.email) {
      const wishlistItem = {
        name: product.name,
        email: user.email,
        img: product.img,
        price: product.price,
        short_desc: product.short_desc,
      };

      axiosPublic
        .post("/wishlist", wishlistItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${product.name} added to wishlist`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${product.name} is already in the wishlist`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error("Error adding product to wishlist", error);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/all-products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      });
  }, []);

  const filterProductsByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === "all") {
      const filtered = allProducts.reduce((acc: Product[], curr: Product) => {
        const index = acc.findIndex((item) => item.category === curr.category);
        if (index === -1) {
          acc.push(curr);
        } else if (
          acc.filter((item) => item.category === curr.category).length < 4
        ) {
          acc.push(curr);
        }
        return acc;
      }, []);
      setFilteredProducts(filtered);
    } else {
      const filtered = allProducts.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchedProducts = searchQuery
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-medium my-8">Shop Our Products</h1>
      <div className="flex justify-center mb-4">
        <button
          className={`btn ${
            activeCategory === "all" ? "btn-active" : ""
          } mr-4 bg-amber-600 text-white`}
          onClick={() => filterProductsByCategory("all")}
        >
          All Products
        </button>
        <button
          className={`btn ${
            activeCategory === "Vegetable" ? "btn-active" : ""
          } mr-4 bg-green-600 text-white`}
          onClick={() => filterProductsByCategory("Vegetable")}
        >
          Vegetables
        </button>
        <button
          className={`btn ${
            activeCategory === "Fruits" ? "btn-active" : ""
          } mr-4 bg-sky-600 text-white`}
          onClick={() => filterProductsByCategory("Fruits")}
        >
          Fruits
        </button>
        <button
          className={`btn ${
            activeCategory === "meat" ? "btn-active" : ""
          } mr-4 bg-red-600 text-white`}
          onClick={() => filterProductsByCategory("meat")}
        >
          Meat
        </button>
      </div>
      <div className="relative mb-4">
        <input
          type="search"
          placeholder="Search..."
          onChange={handleSearchChange}
          className="border rounded-md px-4  py-2 w-9/12"
        />
      </div>
      {loading ? (
        <>
          <h1>Please Wait...</h1>
          <span className="loading loading-bars loading-lg"></span>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {searchedProducts.map((product, index) => (
            <div
              key={index}
              className="card hover:shadow-2xl h-auto bg-transparent glass"
              style={{
                backdropFilter: "blur(1px)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <figure className="all-products-zoom-img">
                <img className="h-60 w-full" src={product.img} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="font-semibold"> ${product.price}/ kg</p>
                <div className="card-actions flex justify-between items-center">
                  <div className="flex items-center ">
                    {user && !isAdmin ? (
                      <h1 className="card-actions text-xl">
                        WishList
                        <FaRegPlusSquare
                          onClick={() => handleWishList(product)}
                          className="mt-1 bg-blue-500 text-white text-2xl"
                        />
                      </h1>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    {isAdmin ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleOpenModal(product)}
                        className=" font-bold bg-orange-600 text-2xl p-3 rounded-lg text-white"
                      >
                        <FaCartPlus />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default AllProducts;
