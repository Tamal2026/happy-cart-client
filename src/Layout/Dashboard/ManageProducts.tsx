import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  img: string;
}

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState<Product[]>([]);

  const { data: productsData = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/all-products");
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch products");
      }
    },
  });

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-12 h-12"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <button className="rounded-lg bg-sky-600 btn-sm text-white hover:-translate-y-1 transition-transform ease-in">
                    <FaEdit />
                  </button>
                </td>

                <td>
                  <button className="rounded-lg text-xl bg-red-600 p-2 text-white hover:-translate-y-1 transition-transform ease-out"><MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
