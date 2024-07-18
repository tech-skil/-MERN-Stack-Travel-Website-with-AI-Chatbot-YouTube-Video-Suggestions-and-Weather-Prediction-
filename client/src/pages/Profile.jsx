import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import ChatIcon from "./ChatIcon";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
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
    try {
      dispatch(updateUserStart());
      const storage = getStorage(app);
      const photoname = new Date().getTime() + photo.name.replace(/\s/g, "");
      const storageRef = ref(storage, `profile-photos/${photoname}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPhotoPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            const res = await fetch(
              `/api/user/update-profile-photo/${currentUser._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": " application/json",
                },
                body: JSON.stringify({ avatar: downloadUrl }),
              }
            );
            const data = await res.json();
            if (data?.success) {
              alert(data?.message);
              setFormData({ ...formData, avatar: downloadUrl });
              dispatch(updateUserSuccess(data?.user));
              setProfilePhoto(null);
              return;
            } else {
              dispatch(updateUserFailure(data?.message));
            }
            dispatch(updateUserFailure(data?.message));
            alert(data?.message);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logOutStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data?.success !== true) {
        dispatch(logOutFailure(data?.message));
        return;
      }
      dispatch(logOutSuccess());
      navigate("/login");
      alert(data?.message);
    } catch (error) {
      console.log(error);
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
        alert(data?.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full mt-24 p-2">
      {currentUser ? (
        <>
          <div className="w-full md:w-1/3 p-3">
            <div className="flex flex-col items-center gap-4 p-3 bg-white shadow rounded-lg">
              <div className="relative w-64 h-64">
                <img
                  src={
                    (profilePhoto && URL.createObjectURL(profilePhoto)) ||
                    formData.avatar
                  }
                  alt="Profile photo"
                  className="w-full h-full object-cover rounded-full cursor-pointer"
                  onClick={() => fileRef.current.click()}
                />
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  hidden
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
                <label
                  htmlFor="photo"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer"
                >
                  Choose Photo
                </label>
              </div>
              {profilePhoto && (
                <div className="flex w-full justify-between gap-1 mt-3">
                  <button
                    onClick={() => handleProfilePhoto(profilePhoto)}
                    className="bg-green-700 text-white p-2 flex-1 hover:opacity-90"
                  >
                    {loading ? `Uploading...(${photoPercentage}%)` : "Upload"}
                  </button>
                </div>
              )}
              <div className="w-full my-4 border-b-2 border-gray-300"></div>
              <div className="w-full flex justify-between px-1">
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-lg font-semibold border border-red-600 p-1 rounded-lg hover:bg-red-600 hover:text-white"
                >
                  Log-out
                </button>
                <button
                  onClick={() => setActivePanelId(3)}
                  className="text-white text-lg bg-gray-500 p-1 rounded-lg hover:bg-gray-700"
                >
                  Edit Profile
                </button>
              </div>
              <div className="w-full shadow-2xl rounded-lg p-3 break-all bg-gray-100 mt-4">
                <p className="text-3xl font-semibold m-1">
                  Hi {currentUser.username}!
                </p>
                <p className="text-lg font-semibold">Email: {currentUser.email}</p>
                <p className="text-lg font-semibold">Phone: {currentUser.phone}</p>
                <p className="text-lg font-semibold">Address: {currentUser.address}</p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="text-red-600 hover:underline mt-4"
              >
                Delete account
              </button>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-3">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <p className="text-lg font-semibold">M.Arch.</p>
              <p>Arch., Southern California Institute of Architecture, 2004</p>
              <p className="text-lg font-semibold mt-2">B.A.</p>
              <p>Sociology and Anthropology, Holy Cross College, 1995</p>
              <h2 className="text-2xl font-bold mt-6 mb-4">Interests</h2>
              <ul className="list-disc list-inside">
                <li>Architecture</li>
                <li>Social impact design</li>
                <li>Augmented and virtual reality</li>
                <li>Digital fabrication</li>
                <li>Design thinking</li>
              </ul>
              <h2 className="text-2xl font-bold mt-6 mb-4">About</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, earum! Dolorum delectus magni aliquam nisi tempora quisquam ut? Odit placeat nam hic quia distinctio. Perferendis excepturi velit consectetur consequuntur rerum.</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4 mt-4">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-lg"><strong>Phone:</strong> (400) 139-9865</p>
              <p className="text-lg"><strong>Email:</strong> <a href="mailto:fordantonette5@yahoo.com" className="text-blue-600">fordantonette5@yahoo.com</a></p>
              <p className="text-lg"><strong>Campus:</strong> IU Southeast</p>
              <p className="text-lg"><strong>Website:</strong> <a href="http://mywebsite.com" className="text-blue-600">mywebsite.com</a></p>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="text-red-700 text-xl">Login First</p>
        </div>
      )}
      <ChatIcon />
    </div>
  );
};

export default Profile;
