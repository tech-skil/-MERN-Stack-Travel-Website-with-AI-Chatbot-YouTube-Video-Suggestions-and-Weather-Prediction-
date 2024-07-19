import axios from 'axios';


const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

if (!API_KEY) {
  throw new Error("YouTube API key not found. Please set VITE_YOUTUBE_API_KEY in your .env file.");
}

export const searchYouTubeVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query + ' travel vlog',
        type: 'video',
        maxResults: 3,
        key: API_KEY,
        videoEmbeddable: true,
        relevanceLanguage: 'en',
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

export const getStoredVideos = () => {
  const storedVideos = localStorage.getItem('youtubeVideos');
  return storedVideos ? JSON.parse(storedVideos) : [];
};

export const storeVideos = (videos) => {
  localStorage.setItem('youtubeVideos', JSON.stringify(videos));
};