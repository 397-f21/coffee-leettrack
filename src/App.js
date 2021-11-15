import { useState, useEffect } from "react";
import "./index.css";

import ProgressIcon from "./Components/ProgressIcon";
import { Typography, MenuItem, FormControl, Select } from "@mui/material";


function App() {
  const questionData = {
    "arrays": {
      "color" : "#e8921a",
      "questions": {
        "217" : {
          "id" : "217",
          "name" : "Contains Duplicate",
          "url" : "https://leetcode.com/problems/contains-duplicate/",
          "completed" : 1
        },
        "268" : {
          "id" : "268",
          "name" : "Missing Number",
          "url" : "https://leetcode.com/problems/missing-number/",
          "completed" : 0
        },
        "136" : {
          "id" : "136",
          "name" : "Single Number",
          "url" : "https://leetcode.com/problems/single-number/",
          "completed" : 0
        }
      }
    },
    "two pointers": {
      "color": "#3eacc2",
      "questions": {

        "141" : {
          "id": "141",
          "name" : "Linked List Cycle",
          "url" : "https://leetcode.com/problems/linked-list-cycle/",
          "completed" : 1,
          "reviewAgain" : 0
        },
        "2" : {
          "id": "2",
          "name" : "Add Two Numbers",
          "url" : "https://leetcode.com/problems/add-two-numbers/",
          "completed" : 1,
          "reviewAgain" : 0
        },
        "148" : {
          "id": "148",
          "name" : "Sort List",
          "url" : "https://leetcode.com/problems/sort-list/",
          "completed" : 0,
          "reviewAgain" : 0
        }
      }
    },
    "sliding window": {
      "color" : "#09944c",
      "questions" : {
        "209" : {
          "id": "209",
          "name" : "Minimum Size Subarray Sum",
          "url" : "https://leetcode.com/problems/minimum-size-subarray-sum/",
          "completed" : 1,
          "reviewAgain" : 0
        },
        "904" : {
          "id" : "904",
          "name" : "Fruit Into Baskets",
          "url" : "https://leetcode.com/problems/fruit-into-baskets/",
          "completed" : 1,
          "reviewAgain" : 1
        },
        "567" : {
          "id" : "567",
          "name" : "Permutation in String",
          "url" : "https://leetcode.com/problems/permutation-in-string/",
          "completed" : 1,
          "reviewAgain" : 0
        }
      }
    },
    "backtracking": {
      "color" : "#b03a73",
      "questions" : {
        "79" : {
          "id" : "79",
          "name" : "Word Search",
          "url" : "https://leetcode.com/problems/word-search/",
          "completed" : 1,
          "reviewAgain" : 0
        },
        "784" : {
          "id" : "784",
          "name" : "Letter Case Permutation",
          "url" : "https://leetcode.com/problems/letter-case-permutation/",
          "completed" : 0,
          "reviewAgain" : 0
        },
        "78" : {
          "id" : "78",
          "name" : "Subsets",
          "url" : "https://leetcode.com/problems/subsets/",
          "completed" : 1,
          "reviewAgain" : 1
        }
      }
    }
  }


  const [categories, setCategories] = useState(questionData);
  const [dailyGoal, setDailyGoal] = useState(2);
  const [problemsToDo, setProblemsToDo] = useState([]);
  const [newProblems, setNewProblems] = useState([]);
  const [reviewProblems, setReviewProblems] = useState([]);

  //function for set daily goal
  const handleDailyGoal =(event)=>{
    setDailyGoal(event.target.value);
  }

  useEffect(() => {
      // function to select random new problems and problems to review
      const refreshProblems = () => {
        // iterate through all problems to find all
        // which have the reviewAgain attribute of 1
        var toReview = [];
        var toDo = [];
        for (const category of Object.values(categories)) {
          for (const question of Object.values(category.questions)) {
            if (question.completed === 0) {
              toDo.push(question)
            } else if (question.reviewAgain === 1) {
              toReview.push(question)
            }
          }
        }
        
        setReviewProblems(toReview);
        setProblemsToDo(toDo);
        toDo = toDo.sort(() => Math.random());
        // select dailyGoal random problems from the toDo list
        setNewProblems(toDo.slice(0, dailyGoal));
      }

      refreshProblems();
      
  }, [categories, dailyGoal]);

  return (
    <div className="App">
      <Typography variant="h3" > LeetTrack</Typography>
      <div className="content">
        <div id="progress-icon-list">
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}> Overall Progress: 65%</Typography>
          {Object.keys(categories).map((categoryName) => (
            <ProgressIcon 
              key={categoryName} 
              name={categoryName}
              category={categories[categoryName]}/>
          ))}
        </div>
        <div>
          <div className="new-qestion">
          <Typography variant="h5" sx={{ fontWeight: 'medium' }}> 
           Recommended New Problems:
          </Typography>
          <div className="problem-list-header">
            <Typography variant="h8" sx={{ fontWeight: 'bold' }}> 
            Daily Goal:
            </Typography>
              <FormControl fullWidth size={"small"}>
                <Select
                  value={dailyGoal}
                  onChange={handleDailyGoal}
                >
                  {problemsToDo.length === 0 ?
                  <MenuItem value={dailyGoal}>{dailyGoal}</MenuItem> :
                    problemsToDo.map((problem, idx) => (
                      <MenuItem 
                        key={problem.id} 
                        value={idx+1}>
                          {idx+1}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}> Problems to Review:</Typography>
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
