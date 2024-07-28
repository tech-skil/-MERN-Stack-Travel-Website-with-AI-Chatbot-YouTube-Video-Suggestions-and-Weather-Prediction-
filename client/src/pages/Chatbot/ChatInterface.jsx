import React, { useState, useRef, useEffect } from "react";
import {
  FaPlane,
  FaPaperPlane,
  FaVolumeUp,
  FaVolumeMute,
  FaWifi,
  FaTrash,
  FaMicrophone,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
} from "react-icons/fa";
import { initializeChat, sendMessage } from "./GeminiService";
import { searchYouTubeVideos } from "./YouTubeService";
import scrollLoading from "../../assets/images/scrollLoding.gif";
import "../styles/Home.css";

const MAX_HISTORY = 500;

const formatResponse = (text) => {
  const sections =
    text.split("**").filter((s) => s.trim()) ||
    text.split("##").filter((s) => s.trim());
  let formattedText = "";

  sections.forEach((section, index) => {
    if (index === 0) {
      formattedText += `<h3 class="text-base sm:text-lg md:text-xl font-semibold mb-2">${section.trim()}</h3>`;
    } else if (section.includes(":")) {
      const [header, content] = section.split(":");
      formattedText += `<h4 class="text-sm sm:text-base md:text-lg font-semibold mt-3 mb-1">${header.trim()}:</h4>`;
      formattedText += `<p class="text-xs sm:text-sm md:text-base mb-2">${content
        .trim()
        .replace(/\*/g, "")}</p>`;
    } else {
      formattedText += `<p class="text-xs sm:text-sm md:text-base mb-2">${section
        .trim()
        .replace(/\*/g, "")}</p>`;
    }
  });

  return formattedText;
};

const isGreeting = (input) => {
  const greetings = ["hi", "hello", "hey", "greetings", "howdy"];
  return greetings.some((greeting) => input.toLowerCase().includes(greeting));
};

const ChatInterface = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem("youtubeVideos");
    return savedVideos ? JSON.parse(savedVideos) : [];
  });
  const [showSettings, setShowSettings] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(() => {
    return localStorage.getItem("selectedVoice") || "default";
  });

  useEffect(() => {
    initializeChat();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const filteredVoices = voices.filter(voice => 
        voice.lang.startsWith('en') || 
        voice.lang.startsWith('hi') || 
        voice.lang.startsWith('ta') ||
        voice.lang.startsWith('te') ||
        voice.lang.startsWith('ml')
      );
      setAvailableVoices(filteredVoices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial load

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "chatMessages",
      JSON.stringify(messages.slice(-MAX_HISTORY))
    );
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("youtubeVideos", JSON.stringify(videos));
  }, [videos]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() && !isLoading && isOnline) {
      const userMessage = {
        id: Date.now(),
        text: input,
        user: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      };
      setMessages((prevMessages) =>
        [...prevMessages, userMessage].slice(-MAX_HISTORY)
      );
      setInput("");
      setIsLoading(true);

      try {
        let response;
        if (isGreeting(input)) {
          response =
            "Hello! I'm Triplo, your travel buddy! How can I help you plan your next adventure?";
        } else {
          const context = messages
            .slice(-10)
            .map((m) => m.text)
            .join("\n");
          response = await sendMessage(input, context);
        }

        const formattedResponse = formatResponse(response);
        const botMessage = {
          id: Date.now(),
          text: formattedResponse,
          user: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isFormatted: true,
        };
        setMessages((prevMessages) =>
          [...prevMessages, botMessage].slice(-MAX_HISTORY)
        );
        speakResponse(formattedResponse);

        if (!isGreeting(input)) {
          const youtubeResults = await searchYouTubeVideos(input);
          setVideos(youtubeResults);
          if (youtubeResults.length > 0) {
            const youtubeMessage = {
              id: Date.now(),
              text: `Here are some related YouTube videos:`,
              user: false,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isYouTubeSearch: true,
            };
            setMessages((prevMessages) =>
              [...prevMessages, youtubeMessage].slice(-MAX_HISTORY)
            );
          }
        }
      } catch (error) {
        console.error("Error getting response:", error);
        const errorMessage = {
          id: Date.now(),
          text: "Sorry, Please Check the internet connection and try again.",
          user: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isError: true,
        };
        setMessages((prevMessages) =>
          [...prevMessages, errorMessage].slice(-MAX_HISTORY)
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakResponse = (text) => {
    stopSpeech();
    const strippedText = stripHtml(text);
    const utterance = new SpeechSynthesisUtterance(strippedText);

    if (selectedVoice !== "default") {
      const voice = availableVoices.find((v) => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onstart = () => setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeech = (text) => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speakResponse(text);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    setVideos([]);
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("youtubeVideos");
    stopSpeech();
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prevInput) => prevInput + " " + transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      console.error("Speech recognition not supported");
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.stop();
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
    localStorage.setItem("selectedVoice", e.target.value);
  };
  return (
    <div className="flex justify-center items-center min-h-screen backaground_image sticky bg-gray-100 pt-20">
      <div className="flex flex-col h-screen w-full md:h-[600px] md:w-[768px] lg:w-[1024px] bg-white shadow-xl rounded-lg overflow-hidden relative">
        {!isOnline && (
          <div className="bg-red-500 text-white p-2 text-center">
            <FaWifi className="inline mr-2" />
            You are offline
          </div>
        )}
        <div className="bg-blue-600 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <FaPlane className="text-white mr-2" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Travel and Tourism Guide
            </h1>
          </div>
          <button
            onClick={toggleSettings}
            className="text-white hover:text-gray-200"
          >
            <FaCog />
          </button>
        </div>
        {showSettings && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-md rounded-lg z-10">
            <h2 className="text-lg font-semibold mb-2">Settings</h2>
            <label className="block mb-2">
              Text-to-Speech Voice:
              <select 
              value={selectedVoice} 
              onChange={handleVoiceChange}
              className="ml-2 p-1 border rounded"
            >
              <option value="default">Default</option>
              {availableVoices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </label>
          <button 
            onClick={() => setShowSettings(false)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
              Save
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              toggleSpeech={toggleSpeech}
              isSpeaking={isSpeaking}
              videos={videos}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start items-center">
              <img src={scrollLoading} className="md:w-24" alt="Loading..." />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-gray-50 border-t p-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <button
              onClick={toggleListening}
              className={`mr-2 ${
                isListening ? "text-red-500" : "text-gray-500"
              } hover:text-blue-600`}
            >
              <FaMicrophone />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-sm sm:text-base"
              placeholder="Type a message..."
              disabled={isLoading || !isOnline}
            />
            <button
              onClick={handleSend}
              className={`ml-2 text-blue-600 ${
                isLoading || !isOnline
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-800"
              }`}
              disabled={isLoading || !isOnline}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="absolute bottom-20 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          title="Clear Chat"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

const MessageItem = ({ message, toggleSpeech, isSpeaking, videos }) => {
  const handleSpeechToggle = () => {
    if (message.user || message.isError) return;
    toggleSpeech(message.isFormatted ? stripHtml(message.text) : message.text);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = document.getElementById("video-container");
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    setScrollPosition(container.scrollLeft);
  };

  return (
    <div className={`flex ${message.user ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg ${
          message.user
            ? "bg-blue-100"
            : message.isError
            ? "bg-red-100"
            : "bg-gray-100"
        } relative`}
      >
        {message.isFormatted ? (
          <div
            dangerouslySetInnerHTML={{ __html: message.text }}
            className="text-xs sm:text-sm md:text-base"
          />
        ) : (
          <p className="text-xs sm:text-sm md:text-base">{message.text}</p>
        )}
        {message.isYouTubeSearch && (
          <div className="mt-4 relative">
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            >
              <FaChevronLeft />
            </button>
            <div
              id="video-container"
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
            >
              {videos.map((video) => (
                <a
                  key={video.id.videoId}
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-48 sm:w-56 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="border rounded p-2 hover:shadow-lg hover:border-red-700 hover:border-2 hover:drop-shadow-2xl transition-all duration-300">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full mb-2"
                    />
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold truncate">
                      {video.snippet.title}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                      {video.snippet.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
        <div className="text-xs text-gray-500 mt-1 flex justify-between">
          <span>{message.timestamp}</span>
          {message.user && <span>{message.status}</span>}
        </div>
        {!message.user && !message.isError && (
          <button
            onClick={handleSpeechToggle}
            className={`absolute bottom-2 right-2 ${
              isSpeaking ? "text-blue-600" : "text-gray-500"
            } hover:text-blue-600`}
          >
            {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
