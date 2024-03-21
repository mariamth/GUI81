import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Remove useLocation if not used
import './planner.css';
import home from './assets/navbar/icon_home.png';

const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('You must write something!');
    } else {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div>
      <div className="container1">
        <div>
          <div className="container2">
            <div className="container3">
              <Link to="/suggestion">
                <div className="PLANNER">SUGGESTION</div>
              </Link>
            </div>
            <div className="container3">
              <Link to="/suggestionHeaderS">
                <div className="PLANNER">PLANNER</div>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="container6">
            <div className="Textforplanner">Planner</div>
            <input
              type="text"
              id="input-box"
              placeholder="Add your list"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button id="button1" onClick={addTask}>Add</button>
            <ul id="list-of-notes">
              {tasks.map((task, index) => (
                <li key={index}>
                  {task}
                  <span onClick={() => deleteTask(index)}>&times;</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;