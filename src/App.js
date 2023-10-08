import "./App.css";
import { useEffect, useState } from "react";

import { GetInspiration } from "./GetInspiration";
import { PrepareUpload } from "./PrepareUpload";
import { TailorContent } from "./TailorContent";
import TwelveLabsApi from "./TwelveLabsApi";

function App() {
  const [video, setVideo] = useState({ data: null, isLoading: true });

  useEffect(function fetchVideoOnMount() {
    async function fetchVideo() {
      const response = await TwelveLabsApi.getVideo();
      setVideo({ data: response, isLoading: false });
    }
    fetchVideo();
  }, []);

  return (
    <div>
      <h1>Video Creators' Hub</h1>
      <GetInspiration />
      <PrepareUpload />
      <TailorContent />
    </div>
  );
}

export default App;
