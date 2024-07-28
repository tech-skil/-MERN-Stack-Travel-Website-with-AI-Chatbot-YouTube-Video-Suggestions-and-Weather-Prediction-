import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import rg from "../assets/signin.jpeg"; 
import { OrbitControls, Sphere } from '@react-three/drei';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/signup`, formData);
      if (res?.data?.success) {
        alert(res?.data?.message);
        navigate('/login');
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen signup_image flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white py-2 pb-4 filt space-x-10 md:justify-around rounded-xl space-y-8 flex flex-col md:flex-row">

        <div className="w-full md:w-auto relative h-64 md:h-auto">
          <Canvas>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <Sphere args={[1, 100, 200]} scale={2.5}>
              <meshStandardMaterial color="#4299E1" wireframe />
            </Sphere>
          </Canvas>
          <motion.img
            src={rg}
            alt="Sign up illustration"
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </div>
        <motion.div
          className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'username', type: 'text', placeholder: 'Username', icon: '👤' },
              { name: 'email', type: 'email', placeholder: 'Email', icon: '📧' },
              { name: 'password', type: 'password', placeholder: 'Password', icon: '🔒' },
              { name: 'address', type: 'text', placeholder: 'Address', icon: '🏠' },
              { name: 'phone', type: 'tel', placeholder: 'Phone Number', icon: '📞' },
            ].map((field) => (
              <div key={field.name} className="relative">
                <span className="absolute left-3 top-3">{field.icon}</span>
                <input
                  name={field.name}
                  type={field.type}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                I agree to terms of service
              </label>
            </div>
            <motion.button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign up
            </motion.button>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
