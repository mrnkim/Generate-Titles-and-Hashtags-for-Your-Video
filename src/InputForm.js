import { React } from "react";

export function InputForm({
  field1Prompt,
  setField1Prompt,
  field2Prompt,
  setField2Prompt,
  field3Prompt,
  setField3Prompt,
  field1,
  field2,
  field3,
  generate,
  setField1Result,
  setField2Result,
  setField3Result,
  setLoading,
  loading,
}) {
  function handleCheck(promptType) {
    switch (promptType) {
      case field1:
        setField1Prompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      case field2:
        setField2Prompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      case field3:
        setField3Prompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      default:
        break;
    }
    setLoading(false);
  }

  function handleChange(event, promptType) {
    const inputValue = event.target.value;
    switch (promptType) {
      case field1:
        setField1Prompt((prevState) => ({
          ...prevState,
          prompt: inputValue,
        }));
        break;
      case field2:
        setField2Prompt((prevState) => ({
          ...prevState,
          prompt: inputValue,
        }));
        break;
      case field3:
        setField3Prompt((prevState) => ({
          ...prevState,
          prompt: inputValue,
        }));
        break;
      default:
        break;
    }
  }

  async function handleClick(event) {
    reset();
    event.preventDefault();

    const field1Data = {};
    const field2Data = {};
    const field3Data = {};

    if (field1Prompt.isChecked) {
      if (field1Prompt.prompt.length > 0) {
        field1Data["prompt"] = field1Prompt.prompt;
      }
      field1Data["type"] = field1;
    }

    if (field2Prompt.isChecked) {
      if (field2Prompt.prompt.length > 0) {
        field2Data["prompt"] = field2Prompt.prompt;
      }
      field2Data["type"] = field2;
    }

    if (field3Prompt.isChecked) {
      if (field3Prompt.prompt.length > 0) {
        field3Data["prompt"] = field3Prompt.prompt;
      }
      field3Data["type"] = field3;
    }

    setLoading(true);

    try {
      // Make the summary API call
      if (field1Data["type"]) {
        const summaryResponse = await generate(field1Data);
        setField1Result((prevField1Result) => ({
          ...prevField1Result,
          result: summaryResponse.summary,
        }));
      }
      // Make the chapter API call
      if (field2Data["type"]) {
        const chapterResponse = await generate(field2Data);
        setField2Result((prevField2Result) => ({
          ...prevField2Result,
          result: chapterResponse.chapters,
        }));
      }
      // Make the highlight API call
      if (field3Data["type"]) {
        const highlightResponse = await generate(field3Data);
        setField3Result((prevField3Result) => ({
          ...prevField3Result,
          result: highlightResponse.highlights,
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setField1Result({
      fieldName: field1,
      result: "",
    });
    setField2Result({
      fieldName: field2,
      result: "",
    });
    setField3Result({
      fieldName: field3,
      result: "",
    });
  }

  return (
    <form>
      <div>
        <input
          type="checkbox"
          id={field1}
          name={field1}
          checked={field1Prompt.isChecked}
          onChange={() => handleCheck(field1)}
        />
        <label htmlFor={field1}>{field1}</label>
        <input
          type="text"
          id={`${field1}Prompt`}
          name={`${field1}Prompt`}
          value={field1Prompt.prompt}
          disabled={!field1Prompt.isChecked}
          onChange={(e) => handleChange(e, field1)}
        ></input>
      </div>
      <div>
        <input
          type="checkbox"
          id={field2}
          name={field2}
          checked={field2Prompt.isChecked}
          onChange={() => handleCheck(field2)}
        />
        <label htmlFor={field2}>{field2}</label>
        <input
          type="text"
          id={`${field2}Prompt`}
          name={`${field2}Prompt`}
          value={field2Prompt.prompt}
          disabled={!field2Prompt.isChecked}
          onChange={(e) => handleChange(e, field2)}
        ></input>
      </div>
      <div>
        <input
          type="checkbox"
          id={field3}
          name={field3}
          checked={field3Prompt.isChecked}
          onChange={() => handleCheck(field3)}
        />
        <label htmlFor={field3}>{field3}</label>
        <input
          type="text"
          id={`${field3}Prompt`}
          name={`${field3}Prompt`}
          value={field3Prompt.prompt}
          disabled={!field3Prompt.isChecked}
          onChange={(e) => handleChange(e, field3)}
        ></input>
      </div>
      <button onClick={handleClick} disabled={loading}>
        Generate
      </button>{" "}
      <button onClick={reset}>Reset</button>
    </form>
  );
}
