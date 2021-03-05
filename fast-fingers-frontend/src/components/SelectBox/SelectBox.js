import React from 'react';
import './SelectBox.css';


function SelectBox({options, option, setOption }) {
    return (
        <select
              className="select-level"
              placeholder="DIFFICULTY LEVEL"
              name="difficulty-level"
              value={option}
              onChange={({target : {value}}) => {setOption(value);}}
            >
              {options.map(({label,value}) => <option value={value}>{label}</option>)}
            </select>
    );
}
export default SelectBox;