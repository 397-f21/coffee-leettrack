import * as React from "react";
import Checkbox from "@mui/material/Checkbox";


export default function ControlledCheckbox({ isChecked }) {
  const [checked, setChecked] = React.useState(isChecked);

  const handleChange = async (event) => {    
    setChecked(event.target.checked);
  };

  

  return (
    <Checkbox
      data-testid= "checkbox"
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}