import React from 'react';
import { motion } from 'framer-motion';
import image7 from "../assets/images/image.PNG";
import image8 from "../assets/images/image8.jpeg";
import image9 from "../assets/images/images9.jpeg";
import image10 from "../assets/images/images10.jpeg";
import { FaFacebookF, FaTwitter, FaInstagram, FaExternalLinkAlt } from "react-icons/fa";
import ChatIcon from "./ChatIcon";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="w-full flex justify-center bg-gradient-to-b from-gray-50 to-white py-28">
      <div className="container mx-auto p-4">
        <motion.section 
          className="bg-white rounded-xl shadow-lg py-12 px-4 sm:px-6 lg:px-8 mb-12"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="text-orange-500 font-semibold mb-2"
              variants={fadeIn}
            >
              ABOUT US
            </motion.h2>
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold mb-6"
              variants={fadeIn}
            >
              Welcome to <span className="text-orange-500">TRIPLO</span>
            </motion.h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div 
                className="lg:w-1/2"
                variants={fadeIn}
              >
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Triplo serves as a digital gateway, opening up the world's wonders to visitors right from their screens. We offer a seamless blend of information, inspiration, and convenience, making travel planning an exciting and effortless experience.
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {['Places', 'Reviews', 'Clients'].map((item, index) => (
                    <motion.div 
                      key={item}
                      className="border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className={`fas fa-${index === 0 ? 'hotel' : index === 1 ? 'star' : 'users'} text-orange-500 text-2xl mb-2`}></i>
                      <h3 className="text-2xl font-bold">{index === 0 ? '126' : index === 1 ? '486' : '836'}</h3>
                      <p className="text-gray-600">{item}</p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button 
                  className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition duration-300 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EXPLORE MORE
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2"
                variants={fadeIn}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[image7, image8, image9, image10].map((img, index) => (
                    <motion.img 
                      key={index}
                      src={img} 
                      alt={`Travel image ${index + 1}`} 
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="bg-white rounded-xl shadow-lg py-16 px-4 sm:px-6 lg:px-8"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-orange-500 font-semibold mb-2 uppercase"
                variants={fadeIn}
              >
                OUR TEAM
              </motion.h2>
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold"
                variants={fadeIn}
              >
                Explore Our <span className="text-orange-500">STAFF</span>
              </motion.h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((member) => (
                <motion.div 
                  key={member}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <img src={`path/to/staff${member}.jpg`} alt={`Staff ${member}`} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-center space-x-2 mb-4">
                      {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, index) => (
                        <motion.a 
                          key={index}
                          href="#" 
                          className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon />
                        </motion.a>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-center">Full Name</h3>
                    <p className="text-gray-600 text-center">Designation</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        <ChatIcon />
      </div>
    </div>
  );
};

export default About;