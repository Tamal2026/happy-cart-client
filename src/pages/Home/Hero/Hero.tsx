import img from '../../../../public/assets/hero-img.jpg'

import slider1 from '../../../../public/assets/hero-img-1.png'
import slider2 from '../../../../public/assets/featur-1.jpg'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

const Hero = () => {
    return (
        <div  className="bg-cover bg-center" style={{backgroundImage:`url(${img})`, height:'500px', width:'1900px'}}>
        
            
            <h1 className="text-6xl font-bold text-green-600">Organic Veggies & Fruits Foods</h1>
            const slider = (
  <AwesomeSlider animation="cubeAnimation">
    <div data-src={slider1} />
    <div data-src={slider2} />

  </AwesomeSlider>
);
           
           
        </div>
    );
};

export default Hero;