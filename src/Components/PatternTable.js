import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./PatternTable.css";
import ControlledCheckbox from './ControlledCheckbox';
// import { patterns, questions } from '../data/data';



const PatternTable = ({pattern, setQuestions}) => {
  // console.log(`typeof(setQuestions): ${typeof(setQuestions)}`);

  const columns = [
    { field: 'id', headerName: 'Completed', width: 100 ,
    renderCell: (params) => {
      return checkBoxFormater(pattern, params.value);
    },},
    { field: 'name', headerName: 'Problem', width: 330, 
    renderCell: (params) => {
      return urlFormater(params.value);
    },
  },
    { field: 'difficulty', headerName: 'Difficulty',width:100},
    { field: 'comment', headerName: 'Comment', width: 400 },
  ];

  const rows = JSON.parse(window.localStorage.getItem(`${pattern}`));

  const checkBoxFormater = (pattern, id) => {
    return (
      <ControlledCheckbox 
        pattern={pattern} 
        id={id} 
        setQuestions={setQuestions}
      />
    );
  }
  
  const urlFormater = (name) => {
    let prAdress = name.split(' ').join('-');
    let url = `https://www.leetcode.com/problems/${prAdress.toLowerCase()}/`
    return (
      <a href={url}> {name} </a>
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