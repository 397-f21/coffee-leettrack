import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import { TextField } from '@mui/material';
import "./PatternTable.css";
import ControlledCheckbox from './ControlledCheckbox';
// import { patterns, questions } from '../data/data';



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
    
    
    { field: 'comment', headerName: 'Comment', width: 400,
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
    return (
      <div>{commentObj.notes}</div>
    );
  }
  
  const urlFormater = (name) => {
    let prAdress = name.split(' ').join('-');
    let url = `https://www.leetcode.com/problems/${prAdress.toLowerCase()}/`
    return (
      <a href={url}  target="_blank" rel="noreferrer"> {name} </a>
    );
  };

  return (
        <div className='PatternTable' style={{width: 620, height: 370 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5,10,20]}
            />
        </div>
    );
}

export default PatternTable;