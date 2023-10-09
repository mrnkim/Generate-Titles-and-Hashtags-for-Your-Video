import React from "react";

export function InputForm({
  summaryPrompt,
  setSummaryPrompt,
  chapterPrompt,
  setChapterPrompt,
  highlightPrompt,
  setHighlightPrompt,
}) {
  function handleCheck(promptType) {
    switch (promptType) {
      case "summary":
        setSummaryPrompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      case "chapter":
        setChapterPrompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      case "highlight":
        setHighlightPrompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      default:
        break;
    }
  }

  function handleChange(event, promptType) {
    const inputValue = event.target.value;
    switch (promptType) {
      case "summary":
        setSummaryPrompt((prevState) => ({
          ...prevState,
          prompt: inputValue,
        }));
        break;
      case "chapter":
        setChapterPrompt((prevState) => ({
          ...prevState,
          prompt: inputValue,
        }));
        break;
      case "highlight":
        setHighlightPrompt((prevState) => ({
          ...prevState,
          prompt: inputValue,
        }));
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div>
        <input
          type="checkbox"
          id="summary"
          name="summary"
          checked={summaryPrompt.isChecked}
          onChange={() => handleCheck("summary")}
        />
        <label htmlFor="summary">Summary</label>
        <input
          type="text"
          id="summaryPrompt"
          name="summaryPrompt"
          value={summaryPrompt.prompt}
          disabled={!summaryPrompt.isChecked}
          onChange={(e) => handleChange(e, "summary")}
        ></input>
      </div>

      <div>
        <input
          type="checkbox"
          id="chapter"
          name="chapter"
          checked={chapterPrompt.isChecked}
          onChange={() => handleCheck("chapter")}
        />
        <label htmlFor="chapter">Chapter</label>
        <input
          type="text"
          id="chapterPrompt"
          name="chapterPrompt"
          value={chapterPrompt.prompt}
          disabled={!chapterPrompt.isChecked}
          onChange={(e) => handleChange(e, "chapter")}
        ></input>
      </div>
      <div>
        <input
          type="checkbox"
          id="highlight"
          name="highlight"
          checked={highlightPrompt.isChecked}
          onChange={() => handleCheck("highlight")}
        />
        <label htmlFor="highlight">Highlight</label>
        <input
          type="text"
          id="highlightPrompt"
          name="highlightPrompt"
          value={highlightPrompt.prompt}
          disabled={!highlightPrompt.isChecked}
          onChange={(e) => handleChange(e, "highlight")}
        ></input>
      </div>

      <button>Generate</button>
    </div>
  );
}
