import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import image7 from "../assets/images/images.jpg";
import image8 from "../assets/images/image8.jpeg";
import image9 from "../assets/images/images9.jpeg";
import image10 from "../assets/images/images10.jpeg";
import aboutimg from "../assets/images/signup.jpg";
import { FaFacebookF, FaTwitter, FaInstagram, FaExternalLinkAlt } from "react-icons/fa";
import ChatIcon from "./ChatIcon";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="w-full ">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img src={aboutimg} alt="About Us Hero" className="w-full opacity-60 h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white uppercase">About Us</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.section 
          className="bg-white rounded-xl shadow-lg py-12 px-8 mb-12"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.h2 
            className="text-orange-500 font-semibold mb-2"
            variants={fadeIn}
          >
            ABOUT US
          </motion.h2>
          <motion.h1 
            className="text-4xl font-bold mb-6"
            variants={fadeIn}
          >
            Welcome to <span className="text-orange-500">TRIPLO</span>
          </motion.h1>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div 
              className="lg:w-1/2"
              variants={fadeIn}
            >
              <p className="text-gray-600 mb-8 leading-relaxed">
                Triplo serves as a digital gateway, opening up the world's wonders to visitors right from their screens. We offer a seamless blend of information, inspiration, and convenience, making travel planning an exciting and effortless experience.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { icon: <i className="fas fa-hotel text-orange-500 text-3xl mb-2"></i>, number: '126', label: 'Places' },
                  { icon: <i className="fas fa-star text-orange-500 text-3xl mb-2"></i>, number: '486', label: 'Reviews' },
                  { icon: <i className="fas fa-users text-orange-500 text-3xl mb-2"></i>, number: '836', label: 'Clients' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <h3 className="text-2xl font-bold">{item.number}</h3>
                    <p className="text-gray-600">{item.label}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.button 
                className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 shadow-md hover:shadow-lg text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EXPLORE MORE
              </motion.button>
            </motion.div>
            
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              className="grid grid-cols-2 gap-4 max-w-2xl mx-auto"
            >
              <motion.div className="col-span-1 space-y-4">
                <motion.img
                  src={image7}
                  alt="Travel image 1"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
                <motion.img
                  src={image9}
                  alt="Travel image 3"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </motion.div>
              <motion.div className="col-span-1 space-y-4">
                <motion.img
                  src={image8}
                  alt="Travel image 2"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
                <motion.img
                  src={image10}
                  alt="Travel image 4"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
        
        <ChatIcon />
      </div>
    </div>
  );
};

export default About;
