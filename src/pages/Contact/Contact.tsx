import { FaLocationDot } from "react-icons/fa6";
import { MdOutgoingMail } from "react-icons/md";

const Contact = () => {
  return (
    <section className="my-7">
      <h1 className="font-semibold text-center my-5 text-5xl">
        Contact With us
      </h1>

      <div>
        <div className="bg-slate-100 h-[800px] mx-auto rounded-lg w-[1200px]">
          <h1 className="text-green-400 font-semibold text-3xl text-center py-5">
            Get in Touch
          </h1>
          <h1 className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            ipsum. Tenetur asperiores consequuntur assumenda, dicta est
            distinctio dolorum recusandae cumque quia totam laborum dignissimos
            quod corrupti optio. Similique, minus voluptate?
          </h1>
          <div className="flex justify-center">
            <form>
              <input
                type="text"
                className="w-[500px] pl-4 h-12 ml-5 rounded-lg"
                name="name"
                placeholder="Your Name"
                id=""
              />
              <br />
              <input
                type="email"
                className="w-[500px] my-10 pl-4 h-12 ml-5 rounded-lg"
                name="email"
                placeholder="Enter Your Email Here..."
                id=""
              />
              <br />
              <textarea
                name="message"
                placeholder="Your message"
                className="w-[500px] ml-5 pl-4 pt-2 h-32 rounded-lg"
                id=""
              ></textarea>
              <input
                type="submit"
                className="w-[500px] pl-4 h-12 bg-white text-green-500 mt-4  ml-5 rounded-lg hover:bg-orange-300 hover:text-white"
                name="name"
                placeholder="Your Name"
                id=""
              />
            </form>
            <div className="mr-12">
              <div className="h-24 flex items-center gap-3 w-[400px] mb-5 rounded-lg bg-white">
                <div>
                  <h1 className="text-4xl pl-4 text-green-500">
                    <FaLocationDot />
                  </h1>
                </div>
                <div>
                  <h1 className="text-2xl">Address</h1>
                  <h1 className="text-gray-400">123 Street New York.USA</h1>
                </div>
              </div>
              <div className="h-24 flex items-center gap-3 w-[400px] mb-5 rounded-lg bg-white">
                <div>
                  <h1 className="text-4xl pl-4 text-green-500">
                   <MdOutgoingMail></MdOutgoingMail>
                  </h1>
                </div>
                <div>
                  <h1 className="text-2xl">Mail us</h1>
                  <h1 className="text-gray-400">happycart@gmail.com</h1>
                </div>
              </div>
              <div className="h-24 flex items-center gap-3 w-[400px] mb-5 rounded-lg bg-white">
                <div>
                  <h1 className="text-4xl pl-4 text-green-500">
                    <FaLocationDot />
                  </h1>
                </div>
                <div>
                  <h1 className="text-2xl">Telephone</h1>
                  <h1 className="text-gray-400">(+012) 3456 7890</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
