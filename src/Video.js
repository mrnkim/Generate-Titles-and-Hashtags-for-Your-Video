import React from "react";
import ReactPlayer from "react-player";

export function Video({ video, start, end }) {
  return (
    <div className="video">
      <ReactPlayer
        url={video?.data?.hls.video_url}
        controls
        width="60%"
        height="60%"
        config={{
          hlsOptions: {
            startPosition: start,
            endPosition: end,
          },
        }}
      />
      <div>{video?.data?.metadata.video_title}</div>
    </div>
  );
}
