import "./VideoFileUploadForm.css";
import { useState, useEffect } from "react";
import TwelveLabsApi from "./TwelveLabsApi";
import { Video } from "./Video";
import LoadingSpinner from "./LoadingSpinner.svg";
import sanitize from "sanitize-filename";

/**
 * Receive user's video file, submit it to API, and show task status
 *
 * App -> PrepareUpload -> VideoFileUploadForm
 */

export function VideoFileUploadForm({
  index,
  fetchVideo,
  selectedFile,
  setSelectedFile,
  isFileUploading,
  setIsFileUploading,
}) {
  console.log("🚀 > selectedFile=", selectedFile);
  const [taskId, setTaskId] = useState(null);
  console.log("🚀 > VideoFileUploadForm > taskId=", taskId);
  const [task, setTask] = useState(null);
  console.log("🚀 > VideoFileUploadForm > task=", task);
  const [inputValue, setInputValue] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(false);
  console.log("🚀 > isMonitoring=", isMonitoring);

  /** Verify file type */
  function handleFileSelect(event) {
    let userSelectedFile = event.target.files[0];

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
        setInputValue(selectedFile.name);
      } else {
        alert("Please select a valid video file (e.g., MP4, MPEG, QuickTime).");
        setInputValue("");
      }
    }
  }

  /** Submit file to create a task */
  async function handleFileSubmit(event) {
    event.preventDefault();
    if (selectedFile) {
      setIsFileUploading(true);
      try {
        const response = await TwelveLabsApi.uploadVideo(index, selectedFile);
        console.log("🚀 > handleFileSubmit > response=", response);
        setTaskId(response._id);
      } catch (error) {
        console.error("Video upload error:", error);
      }
    }
  }

  /** Get details on a task */
  async function getTaskDetails(taskId) {
    try {
      const response = await TwelveLabsApi.getTask(taskId);
      return response;
    } catch (error) {
      console.error("Get task details error:", error);
    }
  }

  /** Get details on a task */
  useEffect(() => {
    const fetchData = async () => {
      if (taskId) {
        const response = await getTaskDetails(taskId);
        setTask(response);
        setIsMonitoring(true);
      }
    };

    const checkStatus = async () => {
      const response = await getTaskDetails(taskId);
      console.log("✨✨checkStatus runs!");
      setTask(response);
      if (response.status === "ready" || response.status === "failed") {
        setIsMonitoring(false);
        setTaskId(null);
        setTask(null);
        setInputValue("");
        setSelectedFile(null);
        setIsFileUploading(false);
        fetchVideo();
      } else {
        setTimeout(checkStatus, 10000);
      }
    };

    fetchData();
    if (isMonitoring) {
      checkStatus();
    }
  }, [taskId, isMonitoring]);

  return (
    <div className="videoFileUploadForm">
      <div className="title">Upload video</div>
      <form onSubmit={handleFileSubmit} className="form">
        {/* <input
          className="videoFileUploadInput"
          type="file"
          onChange={handleFileSelect}
          accept="video/*"
          value={inputValue} // Use inputValue for value
        ></input>
        <button className="videoFileUploadButton" disabled={isFileUploading}>
          Upload
        </button> */}
        <label htmlFor="fileUpload" className="selectYourVideo">
          Select Your Video
        </label>
        <input
          id="fileUpload"
          className="videoFileUploadInput"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          accept="video/*"
        />
        <button className="videoFileUploadButton" disabled={isFileUploading}>
          Upload
        </button>
      </form>
      {selectedFile && (
        <div className="selectedFile">
          <span className="label">Selected File:</span>
          <span className="selectedFileName">
            {selectedFile ? (
              <strong>{sanitize(selectedFile.name)}</strong>
            ) : (
              "none"
            )}
          </span>{" "}
        </div>
      )}
      {isFileUploading && (
        <div className=" loading-spinner">
          <img src={LoadingSpinner} alt="Loading Spinner" />
        </div>
      )}
      {isFileUploading && !task && <div className="status">Submitting...</div>}
      {isFileUploading && task && (
        <div className="status">
          {" "}
          {task.status}...
          {task.process === "indexing" &&
            Math.round(task.process.upload_percentage)}
        </div>
      )}
      {task &&
        task.hls &&
        (task.status !== "ready" || task.status !== "failed") && (
          <div className="taskVideo">
            <Video url={task.hls.video_url} />
          </div>
        )}
    </div>
  );
}
