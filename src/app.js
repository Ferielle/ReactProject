import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Create from './components/create';
import Read from './components/read'; // Import the Read component
import Update from './components/update'
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'

function App() {
    return (
      
        <div className="main">
          <h2 className="main-header">React Crud Operations</h2>
          <div>
          <Router>
          <Routes>
          <Route path='/create' element={<Create />} />
        <Route path='/read' element={<Read />} />
        <Route path='/update' element={<Update />} />
        </Routes>
      </Router>
      </div>
      </div>
    );
  }

export default App;
