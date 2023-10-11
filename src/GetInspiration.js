import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoUrlUploadForm } from "./VideoUrlUploadForm";
import { Result } from "./Result";
import "./GetInspiration.css";

export function GetInspiration({ video }) {
  const [field1, field2, field3] = ["summary", "chapter", "highlight"];
  const [field1Prompt, setField1Prompt] = useState({
    fieldName: { field1 },
    isChecked: true,
    prompt: "",
  });
  const [field2Prompt, setField2Prompt] = useState({
    fieldName: { field2 },
    isChecked: true,
    prompt: "",
  });
  const [field3Prompt, setField3Prompt] = useState({
    fieldName: { field3 },
    isChecked: true,
    prompt: "",
  });
  const [field1Result, setField1Result] = useState({
    fieldName: { field1 },
    result: "",
  });
  const [field2Result, setField2Result] = useState({
    fieldName: { field2 },
    result: "",
  });
  const [highlightResult, setHighlightResult] = useState({
    fieldName: { field3 },
    result: "",
  });

  function generate() {
    // Make API calls one by one
  }

  return (
    <div className="getInspiration">
      <div className="videoUrlUploadForm">
        <VideoUrlUploadForm />
      </div>
      <div className="videoAndInputForm">
        {video.data ? <Video video={video} /> : <p>Please Upload a video</p>}
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
          generate
        />
      </div>
      <Result
        field1Prompt={field1Prompt}
        field2Prompt={field2Prompt}
        field3Prompt={field3Prompt}
      />
    </div>
  );
}
