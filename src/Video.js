import React from "react";
import ReactPlayer from "react-player";
import "./Video.css";

/** Shows a video
 *
 * App -> Video
 * App -> {VideoFileUploadForm} -> Video
 *
 */

export function Video({ url }) {
  return (
    <div className="video">
      <ReactPlayer className="react-player" url={url} controls />
    </div>
  );
}
