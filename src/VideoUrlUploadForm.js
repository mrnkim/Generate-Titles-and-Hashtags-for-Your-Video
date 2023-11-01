import "./VideoUrlUploadForm.css";
import { useState } from "react";
import TwelveLabsApi from "./TwelveLabsApi";

export function VideoUrlUploadForm({ uploading, index }) {
  const [selectedFile, setSelectedFile] = useState();

  function handleFileSelect(event) {
    const userSelectedFile = event.target.files[0];

    if (userSelectedFile) {
      //TODO: check what are the types TL allow
      const allowedVideoTypes = [
        "video/mp4",
        "video/mpeg",
        "video/avi",
        "video/3gpp",
        "video/x-msvideo",
        "video/x-matroska",
        "video/ogg",
        "video/webm",
      ];

      if (allowedVideoTypes.includes(userSelectedFile.type)) {
        setSelectedFile(userSelectedFile);
      } else {
        alert("Please select a valid video file (e.g., MP4, MPEG, QuickTime).");
        event.target.value = null;
      }
    }
  }

  async function handleFileSubmit(event) {
    event.preventDefault();
    if (selectedFile) {
      try {
        const response = await TwelveLabsApi.uploadVideo(index, selectedFile);
        console.log("🚀 > handleFileSubmit > response=", response);
      } catch (error) {
        console.error("Video upload error:", error);
      }
    }
  }

  return (
    <div className="videoUrlUploadForm">
      <div className="title">Upload video</div>
      <form onSubmit={handleFileSubmit}>
        <input
          className="videoUrlUploadInput"
          type="file"
          onChange={handleFileSelect}
          accept="video/*"
        ></input>
        <button className="videoUrlUploadButton" disabled={uploading}>
          Upload
        </button>
      </form>
      {selectedFile && (
        <span className="selectedFile">
          Selected File:
          {selectedFile ? selectedFile.name : "none"}{" "}
        </span>
      )}
    </div>
  );
}
