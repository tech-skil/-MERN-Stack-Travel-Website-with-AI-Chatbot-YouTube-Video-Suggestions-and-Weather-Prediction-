import React, { useState } from "react";
import "./styles/Home.css";
import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";

const ChatIcon = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="z-50">
    <button 
  className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
  onClick={toggleChat}
>
  <FaComments size={24}  />
</button>

{isChatOpen && (
  <div className="fixed bottom-20 right-5 w-80 h-48 bg-white border border-gray-300 rounded-lg shadow-xl">
    {/* Chat content goes here */}
    <div className="p-4">
      <h3 className="text-lg  font-bold mb-2 text-orange-600">Welcom to Triplo Guid</h3>
      {/* Add chat messages and input field here */}
      <p>
Triplo's chatbot tour guide unlocks personalized travel insights and assistance.</p>

    </div>
    <div className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 mx-4 rounded-md  text-white py-1">
            <Link to="/ChatInterface">
            Chat with Guid
            </Link>
            </div>
  </div>
)}
    </div>
  );
};

export default ChatIcon;