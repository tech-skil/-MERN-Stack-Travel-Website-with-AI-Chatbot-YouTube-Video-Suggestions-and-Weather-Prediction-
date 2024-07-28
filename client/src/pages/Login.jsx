import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice.js";
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import loginImage from "../assets/loginImage.jpeg"; 
import { OrbitControls, Sphere } from '@react-three/drei';
import './styles/Home.css'
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("sum");
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success) {
        dispatch(loginSuccess(data?.user));
        alert(data?.message);
        navigate("/");
      } else {
        dispatch(loginFailure(data?.message));
        alert(data?.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log(error);
    }
  };

  return (
    <div className="signin_image ">
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl w-full space-y-8  flex bg-transparent bg-white drop-shadow-2xl shadow-black px-10 rounded-lg    py-5 flex-col-reverse md:flex-row-reverse">
        <div className=" w-full md:w-1/2 relative  h-64 md:h-auto">
          <Canvas>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <Sphere args={[1, 100, 200]} scale={2.5}>
              <meshStandardMaterial color="#4299E1" wireframe />
            </Sphere>
          </Canvas>
          <motion.img
            src={loginImage}
            alt="Login illustration"
            className="absolute top-0 hidden md:block left-0 w-full h-full object-cover"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-3">📧</span>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-3">🔒</span>
              <input
                name="password"
                type="password"
                id="password"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Loading..." : "Sign in"}
            </motion.button>
            {/* {error && <p className="text-sm text-red-600">{error}</p>} */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-orange-500 hover:text-orange-600">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default Login;