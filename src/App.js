import "./App.css";
import { useEffect, useState } from "react";

import { GetInspiration } from "./GetInspiration";
import { PrepareUpload } from "./PrepareUpload";
import { TailorContent } from "./TailorContent";
import TwelveLabsApi from "./TwelveLabsApi";

function App() {
  const [video, setVideo] = useState({ data: null, isLoading: true });
  const INDEX_ID = process.env.REACT_APP_INDEX_ID;

  useEffect(function fetchVideoOnMount() {
    async function fetchVideo() {
      const response = await TwelveLabsApi.getFirstVideo(INDEX_ID);
      const videoId = response[0]["_id"];
      const videoDetail = await TwelveLabsApi.getVideo(INDEX_ID, videoId);
      setVideo({ data: videoDetail, isLoading: false });
    }
    fetchVideo();
  }, []);

  if (video.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Video Creators' Hub</h1>
      {video.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <GetInspiration video={video} />
          <PrepareUpload />
          <TailorContent />
        </>
      )}
    </div>
  );
}

export default App;
