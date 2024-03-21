import React, { useEffect, useState } from 'react';
import './suggestion.css';

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
    <div>
      <h1>Planner</h1>
      <div>
        <input
          type="text"
          placeholder="Enter item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>{item.time}</div>
            <div>{item.description}</div>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Planner;