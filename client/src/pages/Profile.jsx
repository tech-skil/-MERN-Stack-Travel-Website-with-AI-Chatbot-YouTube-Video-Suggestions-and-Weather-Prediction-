import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import aboutimg from "../assets/images/coorg.jpeg";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import UpdateProfile from "./user/UpdateProfile";
import { FaTrashAlt, FaEdit, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
  const [activePanelId, setActivePanelId] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleProfilePhoto = (photo) => {
    // ... (keep the existing handleProfilePhoto function)
  };

  const handleLogout = () => {
    try {
      dispatch(logOutStart());
      dispatch(logOutSuccess());
      if (alert("You have been successfully logged out.")) {
        navigate("/login");
        
      }else{
        navigate("/profile/user");
      }
      
    } catch (error) {
      console.log(error);
      dispatch(logOutFailure("An error occurred during logout"));
      alert("An error occurred during logout. Please try again.");
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const CONFIRM = confirm(
      "Are you sure? The account will be permanently deleted!"
    );
    if (CONFIRM) {
      try {
        dispatch(deleteUserAccountStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data?.success === false) {
          dispatch(deleteUserAccountFailure(data?.message));
          alert("Something went wrong!");
          return;
        }
        dispatch(deleteUserAccountSuccess());
        navigate("/login");
      } catch (error) {
        console.log(error);
        dispatch(deleteUserAccountFailure("An error occurred while deleting the account"));
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-100">
      <div className="relative w-full h-96 overflow-hidden">
        <img src={aboutimg} alt="Profile Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white uppercase border-b-4 border-yellow-400 p-2">My Travel Profile</h1>
        </div>
      </div>
      {currentUser ? (
        <div className="w-full max-w-6xl flex flex-wrap justify-center p-8 -mt-20 relative z-10">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <img
                    src={(profilePhoto && URL.createObjectURL(profilePhoto)) || formData.avatar}
                    alt="Profile photo"
                    className="w-48 h-48 object-cover rounded-full border-4 border-yellow-400 cursor-pointer transition-transform transform group-hover:scale-105"
                    onClick={() => fileRef.current.click()}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaEdit className="text-white text-3xl" />
                  </div>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    hidden
                    ref={fileRef}
                    accept="image/*"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />
                </div>
                {profilePhoto && (
                  <button
                    onClick={() => handleProfilePhoto(profilePhoto)}
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    {loading ? `Uploading...(${photoPercentage}%)` : "Upload Photo"}
                  </button>
                )}
                <h2 className="text-3xl font-bold text-gray-800">{currentUser.username}</h2>
                <p className="text-gray-600 italic">"Adventure awaits!"</p>
                <div className="w-full border-t border-gray-200 my-4"></div>
                <div className="w-full space-y-2">
                  <p className="text-gray-700"><strong>Email:</strong> {currentUser.email}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {currentUser.phone}</p>
                  <p className="text-gray-700"><strong>Address:</strong> {currentUser.address}</p>
                </div>
                <div className="w-full flex justify-between mt-6">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FaSignOutAlt /> Log Out
                  </button>
                  <button
                    onClick={() => setActivePanelId(3)}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors mt-4"
                >
                  <FaTrashAlt /> Delete Account
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-2xl font-semibold mb-4">Travel Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-gray-600">Countries Visited</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">37</p>
                  <p className="text-gray-600">Cities Explored</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-600">5</p>
                  <p className="text-gray-600">Continents</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-yellow-600">142</p>
                  <p className="text-gray-600">Travel Photos</p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Recent Trips</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span>Paris, France</span>
                    <span className="text-gray-500">June 2023</span>
                  </li>
                  <li className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span>Tokyo, Japan</span>
                    <span className="text-gray-500">March 2023</span>
                  </li>
                  <li className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span>New York, USA</span>
                    <span className="text-gray-500">December 2022</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {activePanelId === 3 && (
            <div className="w-full mt-8">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>
                <UpdateProfile />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mt-8 p-8 bg-white rounded-lg shadow-xl">
          <p className="text-red-700 text-xl">Please log in to view your profile</p>
          <Link to="/login" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;