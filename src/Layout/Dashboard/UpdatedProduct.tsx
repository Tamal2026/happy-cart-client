import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatedProduct = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { name, category, price, short_desc, img, _id } = useLoaderData();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
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
        price: parseFloat(data.price),
        short_desc: data.short_desc,
        img: res.data.data.display_url,
      };
    
      const ProductRes = await axiosSecure.patch(
        `/all-products/${_id}`,
        productData
      );

      Swal.fire({
        title: "Are you sure?",
        text: `${productData.name} data will be update`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (ProductRes.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: `${productData.name} Updated Successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            defaultValue={name}
            {...register("name")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            {...register("category")}
            defaultValue={category}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Vegetable">Vegetable</option>
            <option value="meat">Meat</option>
            <option value="Fruits">Fruits</option>
          </select>
        </div>
        <div>
          <label className="block">Price:</label>
          <input
            type="number"
            defaultValue={price}
            {...register("price")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block">Short Description:</label>
          <textarea
            defaultValue={short_desc}
            {...register("short_desc")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <p>Current img</p>
        {img && (
          <img
            src={img}
            alt="Product Image"
            className="mt-2 w-40 h-40 object-cover border border-gray-300 rounded"
          />
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <p className="mt-2 text-gray-400">
            If you want to change image choose file
          </p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdatedProduct;
