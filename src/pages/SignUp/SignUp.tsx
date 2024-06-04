import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

type Inputs = {
  name: string;
  email: string;
  password: number | string;
};

const SignUp = () => {
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
   
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser)
   
      updateUserProfile(data.name)
        .then(() => {
          const userInfo = {
            name: data.name,
            email:data.email
          }

axiosPublic.post('/users',userInfo)
.then(res =>{
  if(res.data.insertedId){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });

    navigate('/')
    reset()
  }
})

         
          reset();
          navigate('/')
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-cover" style={{ backgroundImage: 'url("https://i.ibb.co/Fgbmghk/bgg.png")' }}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            
           
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <h1 className="text-xl font-semibold text-green-500 mb-4">Sign Up</h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Name</span>
                  </label>

                  <input
                    type="text"
                    {...register("name")}
                    name="name"
                    placeholder="Enter your name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).*$/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password?.type === "minLength" && (
                  <span className="text-sm m-1 text-red-500">
                    password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-xs m-1 text-red-500">
                    password must be less than 20 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-xs m-1 text-red-500">
                    password must have uppercase, one lowercase, one special
                    character
                  </span>
                )}
              
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary bg-blue-400 text-white font-bold"
                  value="Sign Up"
                />
              </div>
              <div>
                <h1>
                  Already have account ? Go to{" "}
                  <Link className="text-green-500" to="/login">
                    Login
                  </Link>
                </h1>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
