import "./App.css";
import { useEffect, useState } from "react";

import { GenerateTitles } from "./GenerateTitles";
import TwelveLabsApi from "./TwelveLabsApi";

function App() {
  const [video, setVideo] = useState({ data: null, isLoading: true });
  const INDEX_ID = process.env.REACT_APP_INDEX_ID;

  async function fetchVideo() {
    try {
      const response = await TwelveLabsApi.getFirstVideo(INDEX_ID);
      if (response && response.length > 0) {
        const videoId = response[0]["_id"];
        const videoDetail = await TwelveLabsApi.getVideo(INDEX_ID, videoId);
        setVideo({ data: videoDetail, isLoading: false });
      } else {
        setVideo({ data: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      setVideo({ data: null, isLoading: false });
    }
  }

  useEffect(function fetchVideoOnMount() {
    fetchVideo();
  }, []);

  if (video.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app">
      <GenerateTitles video={video} index={INDEX_ID} fetchVideo={fetchVideo} />
    </div>
  );
}

export default App;
