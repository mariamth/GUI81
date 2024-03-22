import React, { useEffect, useState } from 'react';
import './planner.css';

const Planner = () => {
  // State to manage list of items
  const [items, setItems] = useState([]);
  // State to manage input fields
  const [newItem, setNewItem] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle adding new item
  const addItem = () => {
    if (newItem.trim() === '' || time.trim() === '' || description.trim() === '') {
      // Prevent adding empty items
      return;
    }
    const newItemObject = {
      id: Date.now(), // Generate unique ID for each item
      name: newItem,
      time: time,
      description: description
    };
    setItems([...items, newItemObject]);
    // Clear input fields after adding item
    setNewItem('');
    setTime('');
    setDescription('');
  };

  // Function to handle removing an item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className = "input-container">
        <input className='planner-input' type="text" placeholder="Enter item" value={newItem}onChange={(e) => setNewItem(e.target.value)} style={{ width: '10%', color: 'white', fontSize:'17px'}}/>
        <input className='planner-input' type="text" placeholder="Enter time" value={time}onChange={(e) => setTime(e.target.value)} style={{ width: '10%', color: 'white', fontSize:'17px'}}/>
        <input className='planner-input' type="text" placeholder="Enter description"value={description}onChange={(e) => setDescription(e.target.value)} style={{ width: '50%', color: 'white', fontSize:'17px'}}/>
        <button className = "add-button" onClick={addItem} >Add</button>
        <div className = "list-container">
          <ul className = "item-list">
            {items.map(item => (
              <li key={item.id}>
                <div className='list-box-container'>
                <div className = "list-of-item"> TO-DO: {item.name}</div>
                <div className='list-of-time'>Time: {item.time}</div>
                <div className='list-of-description'>Description: {item.description}</div>
                </div>
                <button className = "remove-button" onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default Planner;