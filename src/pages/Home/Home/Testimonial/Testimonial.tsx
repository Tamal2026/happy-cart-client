
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'John Doe',
    rating: 5,
    description: 'This service was fantastic! Highly recommend to anyone looking for great quality and service.',
  },
  {
    name: 'Jane Smith',
    rating: 4,
    description: 'Very good experience overall. The team was professional and the service was top-notch.',
  },
  {
    name: 'Sam Wilson',
    rating: 5,
    description: 'Absolutely wonderful! Will definitely use this service again in the future.',
  },
  {
    name: 'Emily Johnson',
    rating: 4,
    description: 'Great service, friendly staff, and overall a pleasant experience. Would recommend!',
  },
  {
    name: 'Michael Brown',
    rating: 5,
    description: 'Outstanding service! Exceeded my expectations in every way. Thank you!',
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1, // Show one slide at a time on mobile
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-50 mt-5 py-12">
      <div className="text-center">
        <h1 className="text-xl font-serif mt-8 sm:mt-24 sm:mb-5 bg-cyan-500 text-white py-3 rounded-lg w-fit px-4 mx-auto">Our Testimonial</h1>
        <h1 className="font-bold text-gray-600 text-3xl sm:text-5xl mt-2 mb-8 sm:mb-12">Our Clients Say!</h1>
      </div>
      <div className="max-w-xl mx-auto px-4"> {/* Adjusted max-width for better mobile experience */}
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex gap items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-500 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">{testimonial.description}</p>
              <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
