import React from "react";
import ReactPlayer from "react-player";

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
        url={video?.data?.hls.video_url}
        controls
        // width="60%"
        // height="60%"
        config={{
          hlsOptions: {
            startPosition: start,
            endPosition: end,
          },
        }}
      />
      <div>{vidTitleClean}</div>
    </div>
  );
}
