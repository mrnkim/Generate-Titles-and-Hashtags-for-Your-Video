import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";

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
  console.log("🚀 > GetInspiration > summaryPrompt=", summaryPrompt);
  console.log("🚀 > GetInspiration > chapterPrompt=", chapterPrompt)
  console.log("🚀 > GetInspiration > highlightPrompt=", highlightPrompt)

  return (
    <div>
      <h2>1. Get Inspiration</h2>
      {video.data ? <Video video={video} /> : <p>Please Upload a video</p>}
      <InputForm
        summaryPrompt={summaryPrompt}
        setSummaryPrompt={setSummaryPrompt}
        chapterPrompt={chapterPrompt}
        setChapterPrompt={setChapterPrompt}
        highlightPrompt={highlightPrompt}
        setHighlightPrompt={setHighlightPrompt}
      />
    </div>
  );
}
