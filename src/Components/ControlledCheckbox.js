import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { questions } from "../data/data";


export default function ControlledCheckbox({ pattern, id }) {
  let table = JSON.parse(window.localStorage.getItem(`${pattern}`)).filter(question => question['pattern'].includes(pattern));
  
  const checked = table.filter(entry => entry['id'] === id)[0]['complete'];

  const handleChange = async (event) => {    
    for (let i = 0; i < table.length; i++)
    {
      if (table[i]['id'] === id)
      {
        table[i]['complete'] = !table[i]['complete'];
      }
    }
    window.localStorage.setItem([`${pattern}`], JSON.stringify(table));
  };

  

  return (
    <Checkbox
      data-testid= "checkbox"
      checked={Boolean(checked)}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}