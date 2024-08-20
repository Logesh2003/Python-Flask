import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ < Login/> } />
        <Route path="/employees" element={ <EmployeeList /> } />
        <Route path="/add-employee" element={ <AddEmployee /> } />
      </Routes>
    </Router>
  );
}

export default App;
