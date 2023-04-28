import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { EmployeeContext } from '../App';
import {Table,Button} from 'react-bootstrap';

//This component is used to show the employee detail
const UpcomingRetiredEmployeeTable = () => {

  const navigate = useNavigate();

  const { fetchEmployeesLists, employeesLists, fetchUpcomingRetiredEmployeesLists } = useContext(EmployeeContext);

  let query = `query {
    getUpcomingRetiredEmployee {
      Age
      CurrentStatus
      DateOfJoining
      Department
      EmployeeType
      FirstName
      LastName
      Title
      _id
    }
  }`;

  const DELETE_EMPLOYEE_MUTATION = `
    mutation deleteEmployee($id: ID!) {
      deleteEmployee(_id: $id) {
        _id
        LastName
        FirstName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
    `;

  useEffect(function () {
    fetchUpcomingRetiredEmployeesLists({query});
  }, []);

  const deleteEmployee = async(employeeId) => {
    let response = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: DELETE_EMPLOYEE_MUTATION, variables: {id: employeeId} })
        })
        let result = await response.json();
        
        if(result.data.deleteEmployee) {
            alert("Employee is deleted Successfully!");
            fetchEmployeesLists({query});
            renderEmployeeList();
        } else { 
          alert("CAN'T DELETE EMPLOYEE-STATUS ACTIVE");
        }
  }

  const renderEmployeeList = () => {
    return employeesLists && employeesLists.map(employee => {
      return (<tr key={employee._id}>
        <td>{employee.FirstName}</td>
        <td>{employee.LastName}</td>
        <td>{employee.Age}</td>
        <td>{employee.DateOfJoining ? moment(employee.DateOfJoining).format("MM-DD-YYYY"): "" }</td>
        <td>{employee.Title}</td>
        <td>{employee.EmployeeType}</td>
        <td>{employee.CurrentStatus ? "Working" : "Retired" }</td>
        <td>{employee.Department}</td>
        <td><a onClick={() => {navigate(`/edit/${employee._id}`)}}>Edit</a></td>
        <td><a onClick={() => deleteEmployee(employee._id)}>Delete</a></td>
        <td><a onClick={() => {navigate(`/view/${employee._id}`)}}>View</a></td>
      </tr>);
    });
  }

  return (
      <div className='container-fluid'>
        <div style={{float:"right"}}>
          <Button className='mb-3 mt-3' name="addEmployee" id="addEmployee" variant="primary" onClick={() => navigate('/add')}>Create an Employee</Button>
        </div>
          <Table  striped bordered hover variant="dark">
            <thead>
              <tr>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Age</th>
                  <th>DateOfJoining</th>
                  <th>Title</th>
                  <th>EmployeeType</th>
                  <th>CurrentStatus</th>
                  <th>Department</th>
                  <th colSpan={2} style={{textAlign:"center"}}>Action</th>
                  <th>Employee Detail</th>
              </tr>
            </thead>
            <tbody>
              {
                renderEmployeeList() 
              }
            </tbody>
          </Table>
      </div>
  )
}

export default UpcomingRetiredEmployeeTable