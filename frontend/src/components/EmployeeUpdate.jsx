import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeContext } from "../App";
import { Form, Button,Row,Col } from 'react-bootstrap';
import { titles, departments, employeeTypes, statuses } from '../constants';

//Component used to create employee
const EmployeeUpdate = () => {

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
          setFormValue({
            _id: employee._id,
            firstName: employee.FirstName,
            lastName: employee.LastName,
            age: employee.Age,
            doj: new Date(employee.DateOfJoining).toISOString().substr(0,10),
            title: employee.Title,
            department: employee.Department,
            employeeType: employee.EmployeeType,
            currentStatus: employee.CurrentStatus
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

  const { firstName, lastName, age, doj, title, department, employeeType, currentStatus } = formValue;

  const UPDATE_EMPLOYEE_MUTATION = `
      mutation UpdateEmployee($id: ID!, $input: EmployeeInput) {
        updateEmployee(_id: $id, input: $input) {
          _id
          LastName
          FirstName
          Age
          DateOfJoining
          Department
          EmployeeType
          Title
          CurrentStatus
        }
      }
    `;

  //validation function used to validate the employee field
  async function validate(e) {
    let isError = false;
    const { firstName, lastName, age } = formValue;
    let letters = /^[A-Za-z]+$/;

    if (firstName != "" || firstName.match(letters)) {
      setFormValue((prevState) => {
        return {
          ...prevState,
          firstNameError: false
        };
      });
    } else {
      isError = true;
      setFormValue((prevState) => {
        return {
          ...prevState,
          firstNameError: true
        };
      });
    }

    if (lastName != "" || lastName.match(letters)) {
      setFormValue((prevState) => {
        return {
          ...prevState,
          lastNameError: false
        };
      });
    } else {
      isError = true;
      setFormValue((prevState) => {
        return {
          ...prevState,
          lastNameError: true
        };
      });
    }

    if (age >= 13 && age <= 70) {
      setFormValue((prevState) => {
        return {
          ...prevState,
          ageError: false
        };
      });
    } else {
      isError = true;
      setFormValue((prevState) => {
        return {
          ...prevState,
          ageError: true
        };
      });
    }

    const input = {
      query: UPDATE_EMPLOYEE_MUTATION,
      variables : {
        id: id,
        input: {
          FirstName: formValue.firstName,
          LastName: formValue.lastName,
          Age: parseInt(formValue.age),
          DateOfJoining: formValue.doj,
          EmployeeType: formValue.employeeType,
          Title: formValue.title,
          Department: formValue.department,
          CurrentStatus: formValue.currentStatus === 'true' ? true : false,
        }
      }
    }  

    if (!isError) {
      const employeeForm = document.forms.createEmployeeForm;
      if((employeeForm.employeeType.value == "Contract" || employeeForm.employeeType.value == "Seasonal") && (employeeForm.title.value == "Manager" || employeeForm.title.value == "Director"  || employeeForm.title.value == "VP" )){
        alert("Contractor/Seasonal Employee Can’t be Manager/Director/VP");
      } else {
        let response = await fetch("http://localhost:3001/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        let result = await response.json();
        if (result) {
          alert("Employee is updated Successfully!");
          navigate('/list');
        }
      }
    }
  }

  return (
    <div className="container">
      <h1>Update Employee</h1>
      <Form name="createEmployeeForm">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="firstName">
          <Form.Label>FirstName</Form.Label>
          <Form.Control type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="FirstName" />
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
            placeholder="LastName" />
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
          <Form.Control type="number" name="age" id="age" placeholder="Age" onChange={handleChange} value={age} />
          {formValue.ageError && (
            <Form.Text className="text-muted" id="error_age">Please select the age between 13 to 70
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="doj">
          <Form.Label>Date of Joining</Form.Label>
          <Form.Control type="date" name="doj" id="doj" placeholder="DateOfJoining" value={doj} onChange={handleChange} />
        </Form.Group>
</Row>
<Row className="mb-3">
        <Form.Group as={Col} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Select id="title" name="title" onChange={handleChange} value={title}>
            {titles.map((title, index) => { return <option value={title} key={index}>{title}</option> })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Select id="department" name="department" onChange={handleChange} value={department}>
            {departments.map((department, index) => { return <option value={department} key={index}>{department}</option> })}
          </Form.Select>
        </Form.Group>
</Row>
<Row className="mb-3">
        <Form.Group as={Col} controlId="employeeType">
          <Form.Label>EmployeeType</Form.Label>
          <Form.Select id="employeeType" name="employeeType" onChange={handleChange} value={employeeType}>
            {employeeTypes.map((employeeType, index) => { return <option value={employeeType} key={index}>{employeeType}</option> })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="currentStatus">
          <Form.Label>CurrentStatus</Form.Label>
          <Form.Select id="currentStatus" name="currentStatus" onChange={handleChange} value={currentStatus}>
            {statuses.map((status, index) => { return <option value={status.key} key={index}>{status.value}</option> })}
          </Form.Select>
        </Form.Group>
</Row>
        <Button variant="primary"  type="button"
              name="btnUpdateEmployee"
              id="btnUpdateEmployee"
              onClick={() => validate()}>
          Update AN EMPLOYEE
        </Button>
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

export default EmployeeUpdate;
