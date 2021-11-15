import { useState } from "react";
import "./index.css";

import ProgressIcon from "./Components/ProgressIcon";
import Typography from "@mui/material/Typography";
import questions from "./data/data.js";

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
          "completed" : 1
        },
        "2" : {
          "name" : "String to Integer",
          "url" : "https://leetcode.com/problems/string-to-integer-atoi",
          "completed" : 1
        },
        "3" : {
          "name" : "3Sum",
          "url" : "https://leetcode.com/problems/3sum",
          "completed" : 0
        }
      }
    },
    "sliding window": {
      "color" : "#09944c",
      "questions" : {
        "1" : {
          "name" : "Container with Most Water",
          "url" : "https://leetcode.com/problems/container-with-most-water",
          "completed" : 1
        },
        "2" : {
          "name" : "String to Integer",
          "url" : "https://leetcode.com/problems/string-to-integer-atoi",
          "completed" : 1
        },
        "3" : {
          "name" : "3Sum",
          "url" : "https://leetcode.com/problems/3sum",
          "completed" : 1
        }
      }
    },
    "bfs & dfs": {
      "color" : "#b03a73",
      "questions" : {
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
          "completed" : 1
        }
      }
    }
  });
  return (
    <div className="App">
      <Typography variant="h3" > LeetTrack</Typography>
      <div className="content">
        <div id="progress-icon-list">
        <Typography variant="h5" > Overall Progress:65%</Typography>
          {Object.keys(categories).map((categoryName) => (
            <ProgressIcon 
              key={categoryName} 
              name={categoryName}
              category={categories[categoryName]}/>
          ))}
        </div>
        <div id="problems-list">
          <div className="problem-list-header">
            <Typography variant="h5" > Daily Goal: 2 problems</Typography>
            <button>edit</button>
          </div >
            <div id="problems">
              <div>
                <a href={questions[0]['url']}>{questions[0]['name']}</a> 

              </div>
              <div>
                <a href={questions[1]['url']}>{questions[1]['name']}</a> 
              </div>
            </div>
        </div>
  
      </div>
      
    </div>
  );
}

export default App;
