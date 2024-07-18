import React, {useState } from "react";
import { FaTwitter, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import ScrollAnimationComponent from "../ScrollAnimationComponent";
const Footer = () => {
  
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };
  return (

    <div>
      <ScrollAnimationComponent>
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Subscribe For <span className="text-orange-500">MORE UPDATE</span>
            </h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition duration-300"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="mb-8 md:mb-0">
                <h3 className="text-2xl font-bold text-orange-500 mb-4">
                  TRIPLO
                </h3>
                <p className="text-sm">
                  Like Triplo – travels, act as digital portals, offering a
                  seamless fusion of information and inspiration that makes
                  exploring the world's wonders and planning travel from your
                  screen an effortless and exciting experience.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">CONTACT</h4>
                <ul className="space-y-2">
                  <li>123 Street, Karnataka, INDIA</li>
                  <li>+919134567890</li>
                  <li>triplo@gmail.com</li>
                  <li className="flex space-x-4 mt-4">
                    <FaTwitter className="text-xl hover:text-orange-500 cursor-pointer" />
                    <FaFacebook className="text-xl hover:text-orange-500 cursor-pointer" />
                    <FaYoutube className="text-xl hover:text-orange-500 cursor-pointer" />
                    <FaLinkedin className="text-xl hover:text-orange-500 cursor-pointer" />
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">COMPANY</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-orange-500">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500">
                      Terms & Condition
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">SERVICES</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-orange-500">
                    Destination Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500">
                    Attraction Recommendations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500">
                    Travel Planning
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500">
                    Local Events and Activities
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-500">
                    Travel Tips and Safety Information
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © Bangalore, All Right Reserved. Designed By Amigos
              </p>
              <ul className="flex space-x-4 mt-4 md:mt-0">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500"
                  >
                    Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500"
                  >
                    Help
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </ScrollAnimationComponent>
    </div>
  );
};

export default Footer;
