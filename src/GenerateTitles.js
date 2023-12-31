import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoFileUploadForm } from "./VideoFileUploadForm";
import { Result } from "./Result";
import "./GenerateTitles.css";
import TwelveLabsApi from "./TwelveLabsApi";

/** Generate Titles and Hashtags App
 *
 * App -> GenerateTitles -> {VideoFileUploadForm, Video, InputForm, Result}
 *
 */

export function GenerateTitles({ fetchVideo, video, index }) {
  const [loading, setLoading] = useState(false);
  const [field1, field2, field3] = ["topic", "title", "hashtag"];
  const [field1Prompt, setField1Prompt] = useState({
    fieldName: field1,
    isChecked: true,
  });
  const [field2Prompt, setField2Prompt] = useState({
    fieldName: field2,
    isChecked: true,
  });
  const [field3Prompt, setField3Prompt] = useState({
    fieldName: field3,
    isChecked: true,
  });
  const [result, setResult] = useState({
    types: [],
    result: "",
  });
  const [selectedFile, setSelectedFile] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  /** Make API call to generate topic, titles, hashtags of a video  */
  function generate(data) {
    return TwelveLabsApi.generateGist(data, video.data._id);
  }

  const vidTitleRaw = video?.data?.metadata.video_title;
  const vidTitleClean = decodeAndCleanFilename(vidTitleRaw);

  /** Return clean video file name  */
  function decodeAndCleanFilename(filename) {
    const decodedFilename = decodeURIComponent(filename);
    const cleanedFilename = decodedFilename
      .replace(/%20/g, " ")
      .replace(/\([^)]*\)/g, "");
    return cleanedFilename;
  }

  return (
    <div className="generateTitles">
      <h1 className="appTitle">Generate Titles and Hashtags for Your Video</h1>
      <div className="videoFileUploadForm">
        <VideoFileUploadForm
          index={index}
          fetchVideo={fetchVideo}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          isFileUploading={isFileUploading}
          setIsFileUploading={setIsFileUploading}
        />
      </div>
      <div className="videoAndInputForm">
        {video.data && !selectedFile && (
          <Video url={video.data.hls.video_url} />
        )}
        {!video.data && (
          <p>There is no video in your index. Start uploading one!</p>
        )}
        {video.data && !selectedFile && result.result && (
          <div className="videoTitle">{vidTitleClean}</div>
        )}

        {!selectedFile && (
          <InputForm
            field1Prompt={field1Prompt}
            setField1Prompt={setField1Prompt}
            field2Prompt={field2Prompt}
            setField2Prompt={setField2Prompt}
            field3Prompt={field3Prompt}
            setField3Prompt={setField3Prompt}
            field1={field1}
            field2={field2}
            field3={field3}
            generate={generate}
            result={result}
            setResult={setResult}
            setLoading={setLoading}
            loading={loading}
          />
        )}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && result.result && !selectedFile && video.data && (
        <Result result={result} />
      )}
    </div>
  );
}
