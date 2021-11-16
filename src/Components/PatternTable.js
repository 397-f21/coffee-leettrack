import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {questions} from '../data/data';
import "./PatternTable.css";
import ControlledCheckbox from './ControlledCheckbox';



const checkBoxFormater = (solved) => {

  return (
    <ControlledCheckbox
    isChecked={solved}/>
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
    { field: 'completed', headerName: 'Completed', width: 100 ,
    renderCell: (params) => {
      return checkBoxFormater(params.value);
    },},
    { field: 'name', headerName: 'Problem', width: 330, 
    renderCell: (params) => {
      return urlFormater(params.value);
    },
  },
    { field: 'difficulty', headerName: 'Difficulty',width:100},
    { field: 'comment', headerName: 'Comment', width: 430 },
  
  ];

  console.log(pattern);
  console.log(questions);
  const rows = questions.filter(question => question['pattern'].includes(pattern.pattern));
                        // .forEach(question => question['name'] = nameLink(question));
    console.log(rows);
    return (
      <div className='PatternTable'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5,10,20]}
        />
      </div>
    );
}

export default PatternTable;