import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./PatternTable.css";
import ControlledCheckbox from './ControlledCheckbox';
import { patterns, questions } from '../data/data';


const checkBoxFormater = (pattern, id) => {
  return (
    <ControlledCheckbox pattern={pattern.pattern} id={id}/>
  );
}

const urlFormater = (name) => {
  let prAdress = name.split(' ').join('-');
  let url = `https://www.leetcode.com/problems/${prAdress.toLowerCase()}/`
  return (
    <a href={url}> {name} </a>
  );
};

const PatternTable = (pattern) => {
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

  const rows = JSON.parse(window.localStorage.getItem(`${pattern.pattern}`));
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