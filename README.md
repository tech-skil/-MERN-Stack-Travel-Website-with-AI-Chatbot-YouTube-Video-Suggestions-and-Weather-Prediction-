
# *MERN Stack Travel Website with AI Chatbot, YouTube Video Suggestions, and Weather Prediction*

Welcome to the Travel Website project! This project integrates Gemini API for chat functionality, YouTube API for video content, and Weather API for real-time weather updates. The project is built using React and Tailwind CSS for the front-end and Node.js with Express and MongoDB for the back-end.

## Project Structure

- **Front-End**: Contains the React application with Tailwind CSS for styling.
- **Back-End**: Contains the Node.js server with Express, which interacts with MongoDB and the various APIs.

## Getting Started

To get started with the project, follow the instructions below to set up both the front-end and back-end environments.

### Prerequisites

- Node.js (v16 or later)
- MongoDB
- NPM 

### Setting Up the Project

#### 1. Clone the Repository

```bash
git clone https://github.com/tech-skil/MERN-Stack-Travel-Website-with-AI-Chatbot-YouTube-Video-Suggestions-and-Weather-Prediction.git
cd -MERN-Stack-Travel-Website-with-AI-Chatbot-YouTube-Video-Suggestions-and-Weather-Prediction
```

#### 2. Set Up Environment Variables

You will need to create environment files for both the front-end and back-end.

##### Front-End

To run the project, you need to set up environment variables for both the front-end and back-end.

#### 1. Create a `.env` file in the Front-End Directory

Navigate to the `frontend` directory and create a `.env` file with the following content:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_WEATHER_API_KEY=your_weather_api_key
```

##### Back-End

Navigate to the `back-end` directory and create a `.env` file with the following variables:

```
MONGODB_URI=your_mongodb_uri
EXPRESS_API_KEY=your_express_api_key
JWT_SECRET=secretss
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
NODE_ENV_CUSTOM=your_custom_node_environment
SERVER_URL=http://localhost:8000


```

Replace the placeholders (`your_youtube_api_key`, `your_gemini_api_key`, `your_weather_api_key`, `your_mongodb_uri`, `your_express_api_key`, in Frontend `.env` file) with your actual API keys and URI.

#### 3. Install Dependencies

##### Back-End

Navigate to the `back-end` directory and run:

```bash
npm install
```

##### Front-End

Navigate to the `front-end` directory and run:

```bash
npm install
```

#### 4. Running the Application

##### Front-End

To run the front-end project, navigate to the `frontend` directory and execute:

```bash
npm run dev
```

This will start the development server for the React application.

##### Back-End

To run the back-end server, navigate to the `backend` directory and execute:

```bash
npm run dev
```

This will start the server and it will be available at `http://localhost:5000` by default.

## Project Features

- **Chat Functionality**: Integrated with Gemini API to provide interactive chat experiences.
- **YouTube Integration**: Displays videos using the YouTube API.
- **Weather Updates**: Fetches and displays current weather information using the Weather API.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

### For any questions or issues, please contact [Jayanth B R on LinkedIn](https://www.linkedin.com/in/jayanth-b-r-650bb3253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app).
---
## *Output Screenshots* : 
![about](https://github.com/tech-skil/Chat-miniprojrct/blob/chatbot/triplo/triplo%20(2).jpg)

![home](https://github.com/tech-skil/Chat-miniprojrct/blob/chatbot/triplo/triplo%20(1).jpg)

![Alt text](https://github.com/tech-skil/Chat-miniprojrct/blob/chatbot/triplo/triplo%20(5).jpg)

![chat](https://github.com/tech-skil/Chat-miniprojrct/blob/chatbot/triplo/triplo%20(3).jpg)

![yt](https://github.com/tech-skil/Chat-miniprojrct/blob/chatbot/triplo/triplo%20(7).jpg)

![yt](https://github.com/tech-skil/Chat-miniprojrct/blob/chatbot/triplo/triplo%20(4).jpg)

![profile](https://github.com/tech-skil/Chat-miniprojrct/blob/chatbot/triplo/triplo%20(6).jpg)

Thank you for checking out the Travel Website project! We hope you find it useful and enjoy working with it.

