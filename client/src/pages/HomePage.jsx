import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="title">Welcome to the Item Management</h1>
      <div className="button-container">
        <Link to="/new" className="button create-button">Create Item</Link>
        <Link to="/items" className="button display-button">Display Items</Link>
      </div>
    </div>
  );
};

export default HomePage;
