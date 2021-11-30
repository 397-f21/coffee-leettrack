import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./PatternTable.css";
import ControlledCheckbox from './ControlledCheckbox';



const PatternTable = ({pattern, questions, setQuestions}) => {

  const columns = [
    { field: 'id', headerName: 'Completed', width: 100 ,
    renderCell: (params) => {
      return checkBoxFormater(params.value);
    },},
    { field: 'name', headerName: 'Problem', width: 330, 
    renderCell: (params) => {
      return urlFormater(params.value);
    },
  },
    { field: 'difficulty', headerName: 'Difficulty',width:100},
    
    
    { field: 'comment', headerName: 'Comment', width: 600,
    renderCell: (params) => {
      return commentFormater(params.value);
    },},
  ];

  let rows = JSON.parse(window.localStorage.getItem('questions')).filter(question => question['pattern'].includes(pattern));
  // console.table(rows);
  const checkBoxFormater = (id) => {
    return (
      <ControlledCheckbox 
        problemID={id} 
        questions={questions}
        setQuestions={setQuestions}
      />
    );
  }

  const commentFormater = (commentObj) => {
    return commentObj.notes;
  }
  
  const urlFormater = (name) => {
    let prAdress = name.split(' ').join('-');
    let url = `https://www.leetcode.com/problems/${prAdress.toLowerCase()}/`
    return (
      <a href={url}  target="_blank" rel="noreferrer"> {name} </a>
    );
  };

  return (
        <div className='PatternTable' data-cy="PatternTable">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            />
        </div>
    );
}

export default PatternTable;