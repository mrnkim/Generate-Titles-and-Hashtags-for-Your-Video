import "./VideoUrlUploadForm.css";

export function VideoUrlUploadForm() {
  return (
    <div className="videoUrlUploadForm">
      <div className="title">Upload video</div>
      <form>
        <input className="videoUrlUploadInput"></input>
        <button className="videoUrlUploadButton">Upload</button>
      </form>
    </div>
  );
}
