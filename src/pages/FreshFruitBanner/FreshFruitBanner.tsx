const FreshFruitBanner = () => {
    return (
        <div className="bg-amber-400 my-11 md:h-[600px] md:flex md:items-center md:justify-evenly">
            <div className="md:w-[500px] md:ml-8">
                <h1 className="text-white text-4xl md:text-6xl font-bold">Fresh Fruits</h1>
                <h1 className="text-3xl md:text-5xl text-center font-bold">in our store</h1>
                <p className="text-sm md:text-base mt-4 md:mt-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus cum officiis libero maiores .</p>
              
            </div>
            <div className="relative mt-8 md:mt-0">
                <img src="https://i.ibb.co/VHRhf4t/baner-1.png" alt="" className="w-full md:w-auto" />
                <div className="flex items-center justify-center bg-white rounded-full absolute w-[140px] h-[140px] top-0 left-0 md:left-16">
                    <h1 className="text-xl md:text-5xl font-semibold">$1</h1>
                    <div className="flex flex-col ml-2">
                        <span className="text-xs md:text-lg font-medium">99¢</span>
                        <span className="text-xs font-medium">kg</span>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default FreshFruitBanner;
