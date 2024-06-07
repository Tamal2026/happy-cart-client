import { SubmitHandler, useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

interface FormData {
  name: string;
  category: string;
  price: number;
  short_desc: string;
  image: File[]; // Define image as File type
}


const AddProduct = () => {
  const axiosSecure = useAxiosSecure();

  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit:SubmitHandler<FormData> = async (data:FormData) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const productData = {
        name: data.name,
        category: data.category,
        price: (data.price), 
        short_desc: data.short_desc,
        img: res.data.data.display_url,
      };
      const ProductRes = await axiosSecure.post("/all-products", productData);
  
      Swal.fire({
        title: "Are you sure?",
        text: `${productData.name} item will be add`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add this!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (ProductRes.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: `${productData.name} has been saved`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    }
  
    reset();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option disabled value="">
              Select a category
            </option>
            <option value="Vegetable">Vegetable</option>
            <option value="meat">Meat</option>
            <option value="Fruits">Fruits</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Short Description:
          </label>
          <textarea
            {...register("short_desc", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image:
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
