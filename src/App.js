import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import ProgressIcon from "./Components/ProgressIcon";

function App() {
  const [categories, setCategories] = useState({
    "arrays": {
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
      },
    },
    "two pointers": {
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
      },
    },
    "sliding window": {
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
  });
  return (
    <div className="App">
        {Object.keys(categories).map((cateogryName) => (
            <ProgressIcon 
              key={cateogryName} 
              name={cateogryName}
              questions={categories[cateogryName]}/>
        ))}
      
    </div>
  );
}

export default App;
