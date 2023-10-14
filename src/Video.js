import React from "react";
import ReactPlayer from "react-player";
import "./Video.css";

export function Video({ video, start, end }) {
  const vidTitleRaw = video?.data?.metadata.video_title;
  const vidTitleClean = decodeAndCleanFilename(vidTitleRaw);

  function decodeAndCleanFilename(filename) {
    const decodedFilename = decodeURIComponent(filename);
    const cleanedFilename = decodedFilename
      .replace(/%20/g, " ")
      .replace(/\([^)]*\)/g, "");
    return cleanedFilename;
  }

  return (
    <div className="video">
      <ReactPlayer
        className="react-player"
        url={video?.data?.hls.video_url}
        controls
        config={{
          hlsOptions: {
            startPosition: start,
            endPosition: end,
          },
        }}
      />
    </div>
  );
}
