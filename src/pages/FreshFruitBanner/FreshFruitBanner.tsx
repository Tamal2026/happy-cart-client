const FreshFruitBanner = () => {
    return (
        <div className="bg-amber-400 my-11 h-[600px] items-center flex justify-evenly">
            <div className="w-[500px]">
                <h1 className="text-white text-6xl font-bold">Fresh Fruits</h1>
                <h1 className="text-5xl  text-center font-bold">in our store</h1>
                <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus cum officiis libero maiores .</h1>
                <button className="btn bg-white mt-8 ml-32" >Buy Now</button>
            </div>
            <div className="relative">
                <img src="https://i.ibb.co/VHRhf4t/baner-1.png" alt="" />
                <div className="flex items-center justify-center bg-white rounded-full absolute w-[140px] h-[140px] top-0 left-0">
                    <h1 className="font-semibold text-5xl">$1</h1> {/* Larger font size for $1 */}
                    <div className="flex flex-col ml-2">
                        <span className="text-lg font-serif font-medium">99¢</span> {/* Smaller font size for 50¢ */}
                        <span className="text-xs font-serif font-semibold">kg</span> {/* Smallest font size for kg */}
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default FreshFruitBanner;
