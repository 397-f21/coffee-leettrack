import {React, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import CompletedQuestionModal from "./CompletedQuestionModal";


export default function ControlledCheckbox({ pattern, id, setQuestions }) {
  
  let question = JSON.parse(window.localStorage.getItem(`questions`))[id];
  const checked = question.complete;
  
  const [open, setOpen] = useState(false);

  const handleChange = async (event) => {
    const newChecked = + !checked
    if (newChecked === 1) {
      setOpen(true);
    }
  };

  return (
    <div>
      <Checkbox
        data-testid= "checkbox"
        checked={Boolean(checked)}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        />
      <CompletedQuestionModal open={open} setOpen={setOpen} problemID={id} setQuestions={setQuestions}/>

    </div>
  );
}