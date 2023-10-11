import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoUrlUploadForm } from "./VideoUrlUploadForm";
import "./GetInspiration.css";

export function GetInspiration({ video }) {
  const [summaryPrompt, setSummaryPrompt] = useState({
    isChecked: true,
    prompt: "",
  });
  const [chapterPrompt, setChapterPrompt] = useState({
    isChecked: true,
    prompt: "",
  });
  const [highlightPrompt, setHighlightPrompt] = useState({
    isChecked: true,
    prompt: "",
  });

  return (
    <div className="getInspiration">
      <h2>1. Get Inspiration</h2>
      <div>
        <VideoUrlUploadForm />
        {video.data ? <Video video={video} /> : <p>Please Upload a video</p>}
      </div>
      <InputForm
        field1Prompt={summaryPrompt}
        setField1Prompt={setSummaryPrompt}
        field2Prompt={chapterPrompt}
        setField2Prompt={setChapterPrompt}
        field3Prompt={highlightPrompt}
        setField3Prompt={setHighlightPrompt}
        field1={"summary"}
        field2={"chapter"}
        field3={"highlight"}
      />
    </div>
  );
}
