import { useContext, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "react-modal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

interface Product {
  name: string;
  price: number;
  img: string;
  category: string;
  _id: string;
  email: string;
}

const ProductModal = ({ product, isOpen, onRequestClose, handleAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <img
          className="h-60 w-full mb-4 object-cover"
          src={product.img}
          alt=""
        />
        <p className="mb-2">Category: {product.category}</p>
        <p className="mb-2">Price: ${product.price} / kg</p>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Quantity:
            <input
            
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="ml-2 border rounded px-2 py-1 w-full"
            
            />
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
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    if (user && user.email) {
      const cartItem = {
        itemId: product._id,
        email: user.email,
        name: product.name,
        img: product.img,
        price: product.price,
        quantity: quantity,
      };
      axiosSecure.post("/cart", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${product.name} has been added to the cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          handleCloseModal();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/all-products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
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

  return (
    <div className="w-[1400px] gap-4 mx-auto">
      <div className="flex items-center justify-evenly mr-12 ">
        <h1 className="text-3xl my-8 font-medium justify-start">
          Shop Our Products
        </h1>
        <div>
          <button
            className={`btn bg-amber-500 text-white mr-5 hover:bg-amber-600 ${
              activeCategory === "all" ? "active" : ""
            }`}
            onClick={() => filterProductsByCategory("all")}
          >
            All Products
          </button>
          <button
            className={`btn bg-emerald-500 text-white mr-5 hover:bg-emerald-600 ${
              activeCategory === "Vegetable" ? "active" : ""
            }`}
            onClick={() => filterProductsByCategory("Vegetable")}
          >
            Vegetables
          </button>
          <button
            className={`btn text-white bg-cyan-500 mr-5 hover:bg-cyan-600 ${
              activeCategory === "Fruits" ? "active" : ""
            }`}
            onClick={() => filterProductsByCategory("Fruits")}
          >
            Fruits
          </button>
          <button
            className={`btn bg-rose-500 text-white mr-5 hover:bg-rose-600 ${
              activeCategory === "meat" ? "active" : ""
            }`}
            onClick={() => filterProductsByCategory("meat")}
          >
            Meat
          </button>
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
              className="card hover:shadow-2xl h-96 w-80 bg-transparent glass"
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
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="btn-primary font-bold bg-orange-600 text-2xl p-3 rounded-lg text-white"
                  >
                    <FaCartPlus />
                  </button>
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
