import React from "react";

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

  function handleClick() {
    if (field1Prompt.isChecked && field1Prompt.prompt.length < 1) {
      alert("Please type something for " + field1);
    }
    if (field2Prompt.isChecked && field2Prompt.prompt.length < 1) {
      alert("Please type something for " + field2);
    }
    if (field3Prompt.isChecked && field3Prompt.prompt.length < 1) {
      alert("Please type something for " + field3);
    }
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

      <button onClick={handleClick}>Generate</button>
    </form>
  );
}
