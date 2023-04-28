import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import NavbarRoute from './components/NavbarRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

// Context used to pass data across the application
export const EmployeeContext = React.createContext();

function App() {
  const [employeesLists, setEmployeesLists] = useState([]);

  const fetchEmployeesLists = (query) => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then(async response => {
      let getAllEmployeeLists = await response.json();
      let employeeLists = getAllEmployeeLists.data.getAllEmployees;
      setEmployeesLists(employeeLists);
      return employeesLists;
    });
  }

  const setEmployeeLists = (data) => {
    setEmployeesLists(data);
  }

  const fetchUpcomingRetiredEmployeesLists = (query) => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then(async response => {
      let getUpcomingRetiredEmployee = await response.json();
      let employeeLists = getUpcomingRetiredEmployee.data.getUpcomingRetiredEmployee;
      setEmployeesLists(employeeLists);
      return employeesLists;
    });
  }


  const passValue = {
    fetchEmployeesLists:fetchEmployeesLists,
    employeesLists:employeesLists,
    setEmployeeLists:setEmployeeLists,
    fetchUpcomingRetiredEmployeesLists: fetchUpcomingRetiredEmployeesLists
  }

  return (
    <div className="App">
      <EmployeeContext.Provider value={passValue}> 
        <NavbarRoute />
      </EmployeeContext.Provider>
   </div>
  );
}

export default App;
