import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useLocalStorage } from "./utilities/useLocalStorage";

export default function CompletedQuestionModal({ open, setOpen, problemID, setQuestions }) {
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

    const validate = () => {
        if (notes === "") {
          setHasError(true);
          return false;
        } else {
          setHasError(false);
          return true;
        }
      };

    const updateProblem = async () => {
        let question = JSON.parse(window.localStorage.getItem(`questions`))[problemID];
        let questions = JSON.parse(window.localStorage.getItem(`questions`));
        
        if (validate()) {
            question.complete = !question.complete;
            question.comment = notes;
            question.review = +review;
            questions[problemID] = question;
            // useLocalStorage(questions, "");
            window.localStorage.setItem(`questions`, JSON.stringify(questions));
            console.log(JSON.parse(window.localStorage.getItem(`questions`))[problemID]);
            // setQuestions((prevQuestions) => (
            //     [
            //         ...prevQuestions.slice(0,problemID),
            //         {
            //             ...prevQuestions[problemID],
            //             complete: 1,
            //             comment: notes,
            //             review: +review
            //         },
            //         ...prevQuestions.slice(problemID+1)
            //     ]
            // ));
            handleClose();
        }
        
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
                        fullWidth
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
                    <div>
                        <FormControlLabel 
                            control={<Checkbox data-testid="checkbox"
                                                checked={review}
                                                onChange={handleChange}
                                                inputProps={{ "aria-label": "controlled" }}/>} 
                            label="I should review this problem again" />
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
