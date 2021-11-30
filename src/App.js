import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./index.css";
import ProgressIcon from "./Components/ProgressIcon";
import ControlledCheckbox from './Components/ControlledCheckbox';
import PatternTable from "./Components/PatternTable";
import {patterns, questionList} from "./data/data.js";
import { Center } from "@chakra-ui/layout";


function App() {

  if (typeof window.localStorage['questions'] === 'undefined'){
    window.localStorage.setItem(`questions`, JSON.stringify(questionList))
  }

  if (typeof window.localStorage['time'] === 'undefined'){
    const date = new Date();
    window.localStorage.setItem(`time`, date.getTime());
  }


  if (typeof window.localStorage['dailyNum'] === 'undefined'){
    window.localStorage.setItem(`dailyNum`, 2);
  }

  const [questions, setQuestions] = useState(JSON.parse(window.localStorage.getItem('questions')));

  const incomplete = questions.filter(question => question.complete === 0);
  const [incompleteProblems, setIncompleteProblems] = useState(incomplete);

  if (typeof window.localStorage['toDo'] === 'undefined'){
    incomplete.sort((firstEl, secondEl) => Math.random() - .5);
    window.localStorage.setItem(`toDo`, JSON.stringify(incomplete));
  }

  const [dailyGoal, setDailyGoal] = useState(window.localStorage.getItem(`dailyNum`));
  const [dailyProblems, setDailyProblems] = useState([]);

  const [reviewProblems, setReviewProblems] = useState([]);
  const [percentComplete, setPercentComplete] = useState(0);

  const [patternSelected, setPatternSelected] = useState("Arrays");

  //function to set daily goal
  const handleDailyGoal =(event)=>{
    setDailyGoal(event.target.value);
    window.localStorage.setItem(`dailyNum`, event.target.value);
    console.log(event.target.value)
  }
  const capitalizeWord = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  useEffect(() => {
    const dailyChange = time => {
      window.localStorage.setItem(`time`, time.getTime());
      const toDo = questions.filter(question => question.complete === 0);
      setIncompleteProblems(toDo);
      toDo.sort((firstEl, secondEl) => Math.random() - .5);

      window.localStorage.setItem('toDo', JSON.stringify(toDo))
    }


    const curr = new Date();
    if (curr.getTime() - JSON.parse(window.localStorage.getItem(`time`)) > 86400000){
      dailyChange(curr);
    }

    const refreshProblems = () => {
      const dailys = JSON.parse(window.localStorage.getItem('toDo'));
      setReviewProblems(questions.filter(question => question.review === 1));
      const toDo = questions.filter(question => question.complete === 0);
      setIncompleteProblems(toDo);
      console.log(incompleteProblems.length)
      setDailyProblems(dailys.slice(0, dailyGoal));
      const totalQuestions = questions.length;
      setPercentComplete(Math.floor((totalQuestions - toDo.length)/totalQuestions*100));
    } //might need to check setIncompleteProblems logic but i think its fine -Daniel

    refreshProblems();
    window.localStorage.setItem('questions', JSON.stringify(questions))

  }, [dailyGoal, questions]);

  return (
    <div className="App">
      <div className="content">
        <div id="progress-column">
          <Typography variant="h2" align="center" style={{ marginBottom: 15 },{marginTop:65}}>LeetTrack</Typography>
          <div id="progress-component-list">
            {Object.keys(patterns).map((categoryName) => (
              <ProgressIcon
              key={categoryName}
              name={categoryName}
              questions={questions.filter(question=>question.pattern.includes(categoryName))}
              setPatternSelected={setPatternSelected}/>
              ))}
          </div>
        </div>
        <div id="problems-column">
          <div id="new-and-review">
            <div id="new-questions" className="card questionCard">
              <div className="question-list-header">
                <Typography variant="h6">
                  Daily Goal:
                </Typography>
                <select
                  id="select-daily-goal"
                  data-cy="select-daily-goal"
                  value={dailyGoal}
                  onChange={handleDailyGoal}
                >
                {incompleteProblems.length === 0 ?
                  <option value={dailyGoal}>{dailyGoal}</option>
                  : incompleteProblems.map((problem, idx) => (
                    <option
                      key={problem.id}
                      data-cy={"select-option-" + (idx+1)}
                      value={idx+1}>
                        {idx+1}
                    </option>
                  ))}
                </select>
                <Typography variant="h6">
                  new problems
                </Typography>
              </div>
              <ol className="problem-list"
                  id="daily-problems"
                  data-cy="daily-problems">
                {dailyProblems.map((question) =>
                  <li className="daily-problem" key={question.id}>
                    <ControlledCheckbox
                      problemID={question.id}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                    <a href={question.url}  target="_blank" rel="noreferrer">{question.name}</a>
                  </li>
                )}
              </ol>
            </div >
            <div id="review-questions" className="card questionCard">
              <div className="question-list-header">
                <Typography variant="h6" style={{paddingTop: 5}}> Problems up for review:</Typography>
              </div>
              <ol className="problem-list">
                {reviewProblems.map((question) =>
                  <li key={question.id} className="review-problem">
                    <a href={question.url} target="_blank" rel="noreferrer">{question.name}</a>
                  </li>
                )}
              </ol>
            </div>
            <div id="progress" className="card questionCard">
              <div className="progressOverallCard">
                <Typography variant="h6" align = 'center' style={{paddingTop: 5}}> Your Progress: </Typography>
                <Typography variant="h1" align = 'center' style={{paddingTop: 5}}> {percentComplete}% </Typography>
              </div>
            </div>
          </div>
          <div className="card tableCard">
            <Typography variant="h5">Current Topic: <b>{capitalizeWord(patternSelected.toLowerCase())}</b></Typography>
            <PatternTable pattern={patternSelected} questions={questions} setQuestions={setQuestions}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
