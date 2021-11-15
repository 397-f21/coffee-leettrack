import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//import { updateData } from "../Utilities/firebase";
import Checkbox from "@mui/material/Checkbox";


export default function CompletedQuestion({ open, setOpen, problemID }) {
    const [notes, setNotes] = useState('');
    const [review, setReview] = useState(false)
    const [hasError, setHasError] = useState(false);


    const handleClose = () => {
        setOpen(false);
        setNotes('');
        setReview(false);
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setNotes(newDescription)
    };

    const updateProblem = async () => {
        try {
            //await updateData(`/problems/` + problemID + '/notes', notes);
            //await updateData(`/problems/` + problemID + '/review', 1);
        } catch (error) {
            alert(error);
        }
        handleClose();
    };

    const handleChange = async (event) => {
        setReview(event.target.checked);
    }

    return (
        <Dialog data-testid="dialogTestId" open={open} onClose={handleClose}>
            <DialogTitle data-cy="addTaskTitle">Nice Work!</DialogTitle>
            <DialogContent>
                <div id="newTaskForm">
                    <TextField
                        autoFocus
                        inputProps={{ "data-testid": "description" }}
                        value={notes}
                        onChange={handleDescriptionChange}
                        label="Problem notes"
                        type="text"
                        variant="standard"
                        error={hasError}
                        helperText={hasError ? "Enter problem notes" : ""}
                    />
                    <div id="selects">
                        <FormControl fullWidth>
                            <InputLabel>Needs review?</InputLabel>
                            <Checkbox
                                data-testid="checkbox"
                                checked={review}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        </FormControl>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button data-testid="addButton" onClick={updateProblem}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
