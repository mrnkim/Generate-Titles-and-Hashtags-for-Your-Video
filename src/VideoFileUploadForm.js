import "./VideoFileUploadForm.css";
import { useState, useEffect } from "react";
import TwelveLabsApi from "./TwelveLabsApi";
import { Video } from "./Video";
import LoadingSpinner from "./LoadingSpinner.svg";

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
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [statusDisplayed, setStatusDisplayed] = useState(false);

  /** Verify file type */
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

  /** Submit file to create a task */
  async function handleFileSubmit(event) {
    event.preventDefault();
    setIsFileUploading(true);
    if (selectedFile) {
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
      setTask(response);
    } catch (error) {
      console.error("Get task details error:", error);
    }
  }

  /** Monitor status of a task */
  // async function monitorTask() {
  //   while (isMonitoring) {
  //     const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //     if (task.status === "ready" || task.status === "failed") {
  //       setTask(null);
  //       setTaskId(null);
  //       setSelectedFile(null);
  //       setIsMonitoring(false);
  //     } else {
  //       await sleep(10000);
  //     }
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      if (taskId) {
        await getTaskDetails(taskId);
        setIsMonitoring(true);
      }
    };

    if (isMonitoring) {
      const checkStatus = async () => {
        const response = await TwelveLabsApi.getTask(taskId);
        setTask(response);

        if (response.status === "ready" || response.status === "failed") {
          // If the status is "ready" and hasn't been displayed yet, set the flag

          if (!statusDisplayed) {
            setStatusDisplayed(true);

            // Wait for 3 seconds and then fetch the video
            setTimeout(() => {
              fetchVideo();
            }, 3000);
          }
          // Stop monitoring when the task is completed or failed
          setSelectedFile(false);
          setIsFileUploading(false);
          setIsMonitoring(false);
        } else {
          // Continue monitoring every 10 seconds
          setTimeout(checkStatus, 10000);
        }
      };

      // Start the initial check and continue monitoring
      fetchData();
      checkStatus();
    } else if (taskId) {
      // If not monitoring, fetch the task details initially
      fetchData();
    }
  }, [taskId, isMonitoring, statusDisplayed]);

  return (
    <div className="videoFileUploadForm">
      <div className="title">Upload video</div>
      <form onSubmit={handleFileSubmit} className="form">
        <input
          className="videoFileUploadInput"
          type="file"
          onChange={handleFileSelect}
          accept="video/*"
        ></input>
        <button className="videoFileUploadButton" disabled={isFileUploading}>
          Upload
        </button>
      </form>
      {selectedFile && (
        <div className="selectedFile">
          Selected File:{" "}
          <span>{selectedFile ? selectedFile.name : "none"}</span>
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
      {task && task.hls && (
        <div className="taskVideo">
          <Video url={task.hls.video_url} />
        </div>
      )}
    </div>
  );
}
