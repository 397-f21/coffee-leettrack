import { useState } from "react";
import "./index.css";

import ProgressIcon from "./Components/ProgressIcon";
import { Typography, MenuItem, FormControl, Select } from "@mui/material";


function App() {
  const [categories, setCategories] = useState({
    "arrays": {
      "color" : "#e8921a",
      "questions": {
        "1" : {
          "name" : "Container with Most Water",
          "url" : "https://leetcode.com/problems/container-with-most-water",
          "completed" : 1
        },
        "2" : {
          "name" : "String to Integer",
          "url" : "https://leetcode.com/problems/string-to-integer-atoi",
          "completed" : 0
        },
        "3" : {
          "name" : "3Sum",
          "url" : "https://leetcode.com/problems/3sum",
          "completed" : 0
        }
      }
    },
    "two pointers": {
      "color": "#3eacc2",
      "questions": {

        "1" : {
          "name" : "Container with Most Water",
          "url" : "https://leetcode.com/problems/container-with-most-water",
          "completed" : 1,
          "reviewAgain" : 0
        },
        "2" : {
          "name" : "String to Integer",
          "url" : "https://leetcode.com/problems/string-to-integer-atoi",
          "completed" : 1,
          "reviewAgain" : 0
        },
        "3" : {
          "name" : "3Sum",
          "url" : "https://leetcode.com/problems/3sum",
          "completed" : 0,
          "reviewAgain" : 0
        }
      }
    },
    "sliding window": {
      "color" : "#09944c",
      "questions" : {
        "1" : {
          "name" : "Container with Most Water",
          "url" : "https://leetcode.com/problems/container-with-most-water",
          "completed" : 1,
          "reviewAgain" : 0
        },
        "2" : {
          "name" : "String to Integer",
          "url" : "https://leetcode.com/problems/string-to-integer-atoi",
          "completed" : 1,
          "reviewAgain" : 1
        },
        "3" : {
          "name" : "3Sum",
          "url" : "https://leetcode.com/problems/3sum",
          "completed" : 1,
          "reviewAgain" : 0
        }
      }
    },
    "bfs & dfs": {
      "color" : "#b03a73",
      "questions" : {
        "1" : {
          "name" : "Container with Most Water",
          "url" : "https://leetcode.com/problems/container-with-most-water",
          "completed" : 1,
          "reviewAgain" : 0
        },
        "2" : {
          "name" : "String to Integer",
          "url" : "https://leetcode.com/problems/string-to-integer-atoi",
          "completed" : 0,
          "reviewAgain" : 0
        },
        "3" : {
          "name" : "3Sum",
          "url" : "https://leetcode.com/problems/3sum",
          "completed" : 1,
          "reviewAgain" : 1
        }
      }
    }
  });
  const [dailyGoal, setDailyGoal] = useState(2);

  // function to select problems the user would like to review
  const selectReviewProblems = () => {
    // iterate through all problems to find all
    // which have the reviewAgain attribute of 1
    var problemsToReview = [];
    for (const [id, category] of Object.entries(categories)) {
      for (const [id, question] of Object.entries(category.questions)) {
        if (question.reviewAgain === 1) {
          problemsToReview.push(question)
        }
      }
    }
    // select dailyGoal random problems from that list
    const shuffled = problemsToReview.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, dailyGoal);
  }

  const getAllProblemsToDo = () => {
    // iterate through all problems to find all
    // which have the completed attribute of 0
    var toDo = [];
    for (const [id, category] of Object.entries(categories)) {
      for (const [id, question] of Object.entries(category.questions)) {
        if (question.completed === 0) {
          toDo.push(question)
        }
      }
    }
    console.log(toDo);
    return toDo;
  }

  // function to select random problems that have not been completed
  const selectRecommendedProblems = (toDo) => {
    // select dailyGoal random problems from that list
    const shuffled = toDo.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, dailyGoal);
  }

  const [problemsToDo, setProblemsToDo] = useState(getAllProblemsToDo());
  console.log(problemsToDo);
  const [newProblems, setNewProblems] = useState(selectRecommendedProblems(problemsToDo));
  const [reviewProblems, setReviewProblems] = useState(selectReviewProblems());

  
  //function for set daily goal
  const handleDailyGoal =(event)=>{
    setDailyGoal(event.target.value);
  }



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
        <div id="problems-list">
          <div className="problem-list-header">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}> Daily Goal:</Typography>
              {/* <h5>{dailyGoal}</h5> */}
              <FormControl fullWidth>
                <Select
                  value={dailyGoal}
                  onChange={handleDailyGoal}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  {/* {problemsToDo.map((index, problem) => {
                    <MenuItem key={index} value={index+1}>{index+1}</MenuItem>
                  })} */}
                  
                </Select>
              </FormControl>
          </div >
          <br/>
          <div>
            <div id="reviewProblems">
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}> Problems to Review:</Typography>
              <ol>
                {reviewProblems.map((question) =>
                  <li>
                    <a href={question.url}>{question.name}</a>
                  </li>
                )}
              </ol>
            </div>
            <div id="newProblems">
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}> Recommended New Problems:</Typography>
              <ol>
                {newProblems.map((question) =>
                  <li>
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
