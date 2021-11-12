import { useState } from "react";
import "./index.css";
import ProgressIcon from "./Components/ProgressIcon";

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
      <div id="progress-icon-list">
        {Object.keys(categories).map((categoryName) => (
          <ProgressIcon 
            key={categoryName} 
            name={categoryName}
            category={categories[categoryName]}/>
        ))}
      </div>
      
    </div>
  );
}

export default App;
