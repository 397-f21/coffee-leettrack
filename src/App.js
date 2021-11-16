import { useState, useEffect } from "react";
import "./index.css";
import ProgressIcon from "./Components/ProgressIcon";
import { Typography, MenuItem, FormControl, Select } from "@mui/material";
import {patterns, questions as questionData} from "./data/data.js";
import CompletedQuestion from "./Components/CompletedQuestionModal";

function App() {
  // const questionData = {
  //   "arrays": {
  //     "color" : "#1fdbf0",
  //     "questions": {
  //       "217" : {
  //         "id" : "217",
  //         "name" : "Contains Duplicate",
  //         "url" : "https://leetcode.com/problems/contains-duplicate/",
  //         "complete" : 1,
  //         "review" : 0
  //       },
  //       "268" : {
  //         "id" : "268",
  //         "name" : "Missing Number",
  //         "url" : "https://leetcode.com/problems/missing-number/",
  //         "complete" : 0,
  //         "review" : 0
  //       },
  //       "136" : {
  //         "id" : "136",
  //         "name" : "Single Number",
  //         "url" : "https://leetcode.com/problems/single-number/",
  //         "complete" : 0,
  //         "review" : 0
  //       }
  //     }
  //   },
  //   "two pointers": {
  //     "color": "#0dd151",
  //     "questions": {

  //       "141" : {
  //         "id": "141",
  //         "name" : "Linked List Cycle",
  //         "url" : "https://leetcode.com/problems/linked-list-cycle/",
  //         "complete" : 1,
  //         "review" : 0
  //       },
  //       "2" : {
  //         "id": "2",
  //         "name" : "Add Two Numbers",
  //         "url" : "https://leetcode.com/problems/add-two-numbers/",
  //         "complete" : 1,
  //         "review" : 0
  //       },
  //       "148" : {
  //         "id": "148",
  //         "name" : "Sort List",
  //         "url" : "https://leetcode.com/problems/sort-list/",
  //         "complete" : 0,
  //         "review" : 0
  //       }
  //     }
  //   },
  //   "sliding window": {
  //     "color" : "#683af2",
  //     "questions" : {
  //       "209" : {
  //         "id": "209",
  //         "name" : "Minimum Size Subarray Sum",
  //         "url" : "https://leetcode.com/problems/minimum-size-subarray-sum/",
  //         "complete" : 1,
  //         "review" : 0
  //       },
  //       "904" : {
  //         "id" : "904",
  //         "name" : "Fruit Into Baskets",
  //         "url" : "https://leetcode.com/problems/fruit-into-baskets/",
  //         "complete" : 1,
  //         "review" : 1
  //       },
  //       "567" : {
  //         "id" : "567",
  //         "name" : "Permutation in String",
  //         "url" : "https://leetcode.com/problems/permutation-in-string/",
  //         "complete" : 1,
  //         "review" : 0
  //       }
  //     }
  //   },
  //   "backtracking": {
  //     "color" : "#ed2b99",
  //     "questions" : {
  //       "79" : {
  //         "id" : "79",
  //         "name" : "Word Search",
  //         "url" : "https://leetcode.com/problems/word-search/",
  //         "complete" : 1,
  //         "review" : 0
  //       },
  //       "784" : {
  //         "id" : "784",
  //         "name" : "Letter Case Permutation",
  //         "url" : "https://leetcode.com/problems/letter-case-permutation/",
  //         "complete" : 0,
  //         "review" : 0
  //       },
  //       "78" : {
  //         "id" : "78",
  //         "name" : "Subsets",
  //         "url" : "https://leetcode.com/problems/subsets/",
  //         "complete" : 1,
  //         "review" : 1
  //       }
  //     }
  //   }
  // }


  const [questions, setQuestions] = useState(questionData);
  const [dailyGoal, setDailyGoal] = useState(2);
  const [problemsToDo, setProblemsToDo] = useState([]);
  const [newProblems, setNewProblems] = useState([]);
  const [reviewProblems, setReviewProblems] = useState([]);
  const [percentComplete, setPercentComplete] = useState(0);
  const [open, setOpen] = useState(true);

  //function for set daily goal
  const handleDailyGoal =(event)=>{
    setDailyGoal(event.target.value);
  }

  useEffect(() => {
      // function to select random new problems and problems to review
      const refreshProblems = () => {
        // iterate through all problems to find all
        // which have the review attribute of 1
        var toReview = [];
        var toDo = [];
        var totalQuestions = 0;
        for (const question of questions) {
          if (question.complete === 0) {
            toDo.push(question)
          } else if (question.review === 1) {
            toReview.push(question)
          }
          totalQuestions++;
        }
        setReviewProblems(toReview);
        setProblemsToDo(toDo);
        toDo = toDo.sort(() => Math.random());
        // select dailyGoal random problems from the toDo list
        setNewProblems(toDo.slice(0, dailyGoal));
        setPercentComplete(Math.floor(toDo.length/totalQuestions*100));
      }

      refreshProblems();
      
  }, [questions, dailyGoal]);

  return (
    <div className="App">
      <Typography variant="h3" > LeetTrack</Typography>
      <div className="content">
       <CompletedQuestion open={open} setOpen={setOpen} problemID={0} />
        <div id="progress-icon-list">
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}> Overall Progress: {percentComplete}%</Typography>
          {patterns.map((categoryName) => (
            <ProgressIcon 
              key={categoryName} 
              name={categoryName}
              questions={questions.filter(x=>x.pattern.includes(categoryName))}/>
          ))}
        </div>
        <div>
          <div className="new-qestion">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}> 
              Problems to Try:
            </Typography>
            <div className="problem-list-header">
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}> 
                Daily Goal:
              </Typography>
              <FormControl size={"small"} >
                <Select
                  value={dailyGoal}
                  onChange={handleDailyGoal}
                >
                {problemsToDo.length === 0 ?
                  <MenuItem value={dailyGoal}>{dailyGoal}</MenuItem> 
                  : problemsToDo.map((problem, idx) => (
                    <MenuItem 
                      key={problem.id} 
                      value={idx+1}>
                        {idx+1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}> 
                problems
              </Typography>
            </div>
            <ol>
              {newProblems.map((question) =>
                <li key={question.id}>
                  <a href={question.url}>{question.name}</a>
                </li>
              )}
            </ol>
          </div >
          <div>
            <div id="reviewProblems">
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}> Problems to Review:</Typography>
              <ol>
                {reviewProblems.map((question) =>
                  <li key={question.id}>
                    <a href={question.url}>{question.name}</a>
                  </li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
