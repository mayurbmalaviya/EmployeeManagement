import React, { useState, useEffect, useContext } from "react";
import moment  from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button,Row,Col } from 'react-bootstrap';
import { titles, departments, employeeTypes, statuses } from '../constants';

const EmployeeDetail = () => {

  //useNavigate hook helps to navigate on other page
  const navigate = useNavigate();

  //useParams hook helps to fetch ID from the URL
  let { id } = useParams();

  const [formValue, setFormValue] = useState({
    _id: "",
    firstName: "",
    firstNameError: false,
    lastName: "",
    lastNameError: false,
    age: "",
    ageError: false,
    doj: "",
    title: "",
    department: "",
    employeeType: "",
    currentStatus: false,
    remainingYears: 0,
    remainingMonths: 0,
    remainingDays: 0
  });

  let FETCH_EMPLOYEE_BY_ID_QUERY = `query GetEmployee($id: ID) {
    getEmployee(_id: $id) {
      _id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
    }
  }`;

  const fetchEmployeeByID = async(employeeId) => {
    let response = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: FETCH_EMPLOYEE_BY_ID_QUERY, variables: {id: employeeId} })
        })
        let result = await response.json();
        if(result?.data?.getEmployee) {
          const employee = result?.data.getEmployee;
          const differenceRetiredAge = 65 - employee.Age;
          const dateOfRetired = moment(result.DateOfJoining).add(differenceRetiredAge,'Y').format("MM-DD-YYYY");
          let retiredDate = moment(dateOfRetired);
          let currentDate = moment(moment().format('MM-DD-YYYY'));
          let dateDifference = retiredDate.diff(currentDate, 'days');

          let remainingYear = Math.round(dateDifference/365);
          let remainingMonths = Math.round((dateDifference - (remainingYear*365))/30);
          let remainingDays  =   Math.round(dateDifference - (remainingYear*365) - (remainingMonths*30));
                  
          setFormValue({
            _id: employee._id,
            firstName: employee.FirstName,
            lastName: employee.LastName,
            age: employee.Age,
            doj: new Date(employee.DateOfJoining).toISOString().substr(0,10),
            title: employee.Title,
            department: employee.Department,
            employeeType: employee.EmployeeType,
            currentStatus: employee.CurrentStatus,
            remainingYears: remainingYear,
            remainingMonths: remainingMonths,
            remainingDays: remainingDays
          })
        }
  }

  useEffect(function () {
    fetchEmployeeByID(id);
  }, []);

  //common handler to update the form value
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
    });
  };

  const { firstName, lastName, age, doj, title, department, employeeType, currentStatus, remainingYears, remainingMonths, remainingDays } = formValue;

  return (
    <div className="container">
      <h1>View Employee</h1>
      <Form name="createEmployeeForm">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="firstName">
          <Form.Label>FirstName</Form.Label>
          <Form.Control type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="FirstName" disabled />
          {formValue.firstNameError && (
            <Form.Text className="text-muted" id="error_firstName">
              Please enter the first name
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="LastName">
          <Form.Label>LastName</Form.Label>
          <Form.Control type="text"
            name="lastName"
            value={lastName}
            id="lastName"
            onChange={handleChange}
            placeholder="LastName" disabled />
          {formValue.lastNameError && (
            <Form.Text className="text-muted" id="error_lastName">
              Please enter the last name
            </Form.Text>
          )}
        </Form.Group>
</Row>
<Row className="mb-3">
        <Form.Group as={Col} controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control disabled type="number" name="age" id="age" placeholder="Age" onChange={handleChange} value={age} />
          {formValue.ageError && (
            <Form.Text className="text-muted" id="error_age">Please select the age between 13 to 70
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="doj">
          <Form.Label>Date of Joining</Form.Label>
          <Form.Control disabled type="date" name="doj" id="doj" placeholder="DateOfJoining" value={doj} onChange={handleChange} />
        </Form.Group>
</Row>
<Row className="mb-3">
        <Form.Group as={Col} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Select disabled id="title" name="title" onChange={handleChange} value={title}>
            {titles.map((title, index) => { return <option value={title} key={index}>{title}</option> })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Select disabled id="department" name="department" onChange={handleChange} value={department}>
            {departments.map((department, index) => { return <option value={department} key={index}>{department}</option> })}
          </Form.Select>
        </Form.Group>
</Row>
<Row className="mb-3">
        <Form.Group as={Col} controlId="employeeType">
          <Form.Label>EmployeeType</Form.Label>
          <Form.Select disabled id="employeeType" name="employeeType" onChange={handleChange} value={employeeType}>
            {employeeTypes.map((employeeType, index) => { return <option value={employeeType} key={index}>{employeeType}</option> })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="currentStatus">
          <Form.Label>CurrentStatus</Form.Label>
          <Form.Select disabled id="currentStatus" name="currentStatus" onChange={handleChange} value={currentStatus}>
            {statuses.map((status, index) => { return <option value={status.key} key={index}>{status.value}</option> })}
          </Form.Select>
        </Form.Group>
</Row>
        <Button variant="primary" type="button"
              name="btnViewEmployeeList"
              id="btnViewEmployeeList"
              onClick={() => navigate('/list')}>
          View Employee List
        </Button>
      </Form>
    </div>
  );
}

export default EmployeeDetail;
