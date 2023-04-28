import React, { useState, useContext } from 'react'
import { EmployeeContext } from '../App';
import {Form,Button} from 'react-bootstrap';

//This component is used to search employee
const UpcomingRetiredEmployeeSearchList = () => {

  const { setEmployeeLists } = useContext(EmployeeContext);
  
  const [search, setSearch] = useState('');

  let query = `query getUpcomingRetiredFilteredEmployee($input: searchDetail){
    getUpcomingRetiredFilteredEmployee(input: $input) {
      _id
      FirstName
      Age
      LastName
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
    }
  }`;

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const submitHandler = async () => {
    const input = {
      query,
      variables : {input: {data: search}}
    }    

    let response = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    console.log("response ::: ", response);
    let result = await response.json();
    console.log("result ::: ", result);
    setEmployeeLists(result?.data?.getUpcomingRetiredFilteredEmployee);
  }

  return (
    <Form className="d-flex">
    <Form.Control
      type="search"
      placeholder="Search Upcoming Employee search"
      className="me-2"
      aria-label="Search"
      name="search" id="search" onChange={handleChange}
    />
    <Button name="btnSearch" id="btnSearch" variant="primary"  onClick={() => submitHandler()}>Search</Button>
  </Form>
  )
}

export default UpcomingRetiredEmployeeSearchList