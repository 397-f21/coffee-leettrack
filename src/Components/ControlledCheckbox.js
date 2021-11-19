import {React, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import CompletedQuestionModal from "./CompletedQuestionModal";


export default function ControlledCheckbox({ pattern, id, setQuestions }) {
  let table = JSON.parse(window.localStorage.getItem(`questions`));
  
  const checked = table.filter(entry => entry['id'] === id)[0]['complete'];
  
  const [open, setOpen] = useState(false);

  const handleChange = async (event) => {
    let newVal = 0;
    for (let i = 0; i < table.length; i++)
    {
      if (table[i]['id'] === id)
      {
        // table[i]['complete'] = !table[i]['complete'];
        newVal = + !table[i]['complete']
      }
    }
    if (newVal === 1) {
      setOpen(true);
    }
    // window.localStorage.setItem([`${pattern}`], JSON.stringify(table));
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