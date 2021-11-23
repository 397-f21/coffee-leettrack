import {React, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import CompletedQuestionModal from "./CompletedQuestionModal";


export default function ControlledCheckbox({ problemID, questions, setQuestions }) {
  
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    if (questions[problemID].complete) {
      setQuestions((prevQuestions) => (
        [
            ...prevQuestions.slice(0,problemID),
            {
                ...prevQuestions[problemID],
                complete: 0,
                comment: '',
                review: 0
            },
            ...prevQuestions.slice(problemID+1)
        ]
      ));
      console.log(questions[problemID]);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="controlled-checkbox">
      <Checkbox
        size="small"
        data-testid= "checkbox"
        checked={Boolean(questions[problemID].complete)}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        />
      <CompletedQuestionModal 
        open={open} 
        setOpen={setOpen} 
        problemID={problemID} 
        questions={questions} 
        setQuestions={setQuestions}/>

    </div>
  );
}