import React from "react";
import ReactPlayer from "react-player";

export function Video({ video }) {
  return (
    <div className="video">
      <ReactPlayer
        url={video.data.hls.video_url}
        controls
        width="60%"
        height="60%"
      />
      <div>{video.data.metadata.video_title}</div>
    </div>
  );
}
