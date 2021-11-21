import {React, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import CompletedQuestionModal from "./CompletedQuestionModal";


export default function ControlledCheckbox({ pattern, id, setQuestions }) {
  
  let questions = JSON.parse(window.localStorage.getItem(`questions`));
  console.log('first')
  console.log(questions[id].complete)
  const checked = questions[id].complete;
  
  const [open, setOpen] = useState(false);

  const handleChange = async (event) => {
    console.log(questions[id].complete)
    questions[id].complete = ! checked;
    if (checked) questions[id].comment['notes'] = ''
    window.localStorage.setItem(`questions`, JSON.stringify(questions));
    setOpen(!checked);
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