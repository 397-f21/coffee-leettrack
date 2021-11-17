import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {questions} from '../data/data';
import "./PatternTable.css";
import ControlledCheckbox from './ControlledCheckbox';



const checkBoxFormater = (solved) => {
  return (
    <ControlledCheckbox isChecked={solved === 1}/>
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
    { field: 'complete', headerName: 'Completed', width: 100 ,
    renderCell: (params) => {
      return checkBoxFormater(params.value);
    },},
    { field: 'name', headerName: 'Problem', width: 330, 
    renderCell: (params) => {
      return urlFormater(params.value);
    },
  },
    { field: 'difficulty', headerName: 'Difficulty',width:100},
    { field: 'comment', headerName: 'Comment', width: 400 },
  
  ];

  // console.log(pattern);
  // console.log(questions);
  const rows = questions.filter(question => question['pattern'].includes(pattern.pattern));
                        // .forEach(question => question['name'] = nameLink(question));
    // console.log(rows);
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