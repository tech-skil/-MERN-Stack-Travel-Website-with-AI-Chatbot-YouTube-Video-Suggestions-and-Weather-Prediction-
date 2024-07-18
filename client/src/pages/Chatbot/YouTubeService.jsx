// YouTubeService.js

import axios from 'axios';

// const API_KEY = 'VITE_YOUTUBE_API_KEY';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
// const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_KEY = 'AIzaSyC6jujrVAv_YC8Fsw8CsF3bacTWY4-ahfw';
export const searchYouTubeVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 3,
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};