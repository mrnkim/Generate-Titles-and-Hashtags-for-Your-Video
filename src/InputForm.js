import { React } from "react";
import "./InputForm.css";

/** Receive user's check prompt for the API call
 *
 * App -> GenerateTitles -> {InputForm}
 *
 */

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
  setLoading,
  loading,
  result,
  setResult,
}) {
  /** Toggle check for each prompt */
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

  /** Combine user input and make an API call  */
  async function handleClick(event) {
    reset();
    event.preventDefault();

    const types = result.types;

    if (field1Prompt.isChecked) {
      types.push(field1);
    }
    if (field2Prompt.isChecked) {
      types.push(field2);
    }
    if (field3Prompt.isChecked) {
      types.push(field3);
    }

    setLoading(true);

    if (types.length === 0) {
      alert("Please check at least one field");
      setLoading(false);
      return;
    }

    try {
      if (types.length > 0) {
        const data = { types: types };
        const gistResponse = await generate(data);

        setResult((prevResult) => ({
          ...prevResult,
          result: gistResponse,
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult({
      types: [],
      result: "",
    });
  }

  return (
    <div className="inputForm">
      <div className="title">What do you need?</div>
      <form className="form">
        <div className="checkboxes">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={field1}
              name={field1}
              checked={field1Prompt.isChecked}
              onChange={() => handleCheck(field1)}
            />
            <label className="label" htmlFor={field1}>
              {field1}
            </label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={field2}
              name={field2}
              checked={field2Prompt.isChecked}
              onChange={() => handleCheck(field2)}
            />
            <label className="label" htmlFor={field2}>
              {field2}
            </label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={field3}
              name={field3}
              checked={field3Prompt.isChecked}
              onChange={() => handleCheck(field3)}
            />
            <label className="label" htmlFor={field3}>
              {field3}s
            </label>
          </div>
        </div>
        <button
          className="generateButton"
          onClick={handleClick}
          disabled={loading}
        >
          Generate
        </button>{" "}
      </form>
    </div>
  );
}
