import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { titles, departments, employeeTypes, statuses } from '../constants';
import { Form, Button,Row,Col } from 'react-bootstrap';

//Component used to create employee

const EmployeeCreate = () => {

  const [formValue, setFormValue] = useState({
    firstName: "",
    firstNameError: false,
    lastName: "",
    lastNameError: false,
    age: "24",
    ageError: false,
    doj: new Date().toISOString().substring(0, 10),
    title: "Manager",
    department: "Engineering",
    employeeType: "Seasonal",
    currentStatus: false,
  });
  const navigate = useNavigate();
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

  const CREATE_EMPLOYEE_MUTATION = `
    mutation CreateEmployee($firstName: String!, $lastName: String!, $age: Int!, $title: String!, $department: String!, $employeeType: String!, $currentStatus: Boolean!, $dateOfJoining: Date!) {
        createEmployee(FirstName: $firstName, LastName: $lastName, Age: $age, Title: $title, Department: $department, EmployeeType: $employeeType, CurrentStatus: $currentStatus, DateOfJoining: $dateOfJoining) {
          FirstName, LastName, Age, _id
        }
      }
    `;

  //validation function used to validate the employee field
  const validate = async (e) => {
    let isError = false;
    let letters = /^[A-Za-z]+$/;
    const { firstName, lastName, age } = formValue;

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

    if (!isError) {
      const employeeForm = document.forms.createEmployeeForm;
      if ((employeeForm.employeeType.value == "Contract" || employeeForm.employeeType.value == "Seasonal") && (employeeForm.title.value == "Manager" || employeeForm.title.value == "Director" || employeeForm.title.value == "VP")) {
        alert("Contractor/Seasonal Employee Can’t be Manager/Director/VP");
      } else {
        const newEmployee = {
          firstName: employeeForm.firstName.value,
          lastName: employeeForm.lastName.value,
          age: parseInt(employeeForm.age.value),
          dateOfJoining: employeeForm.doj.value,
          title: employeeForm.title.value,
          employeeType: employeeForm.employeeType.value,
          currentStatus:
            employeeForm.currentStatus.value == "true" ? true : false,
          department: employeeForm.department.value,
        };
        let response = await fetch("http://localhost:3001/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: CREATE_EMPLOYEE_MUTATION,
            variables: newEmployee,
          }),
        });
        let result = await response.json();
        if (result) {
          alert("Employee is created Successfully!");
          navigate('/list');
        }
      }

    }
  }

  return (
    <div className="container">
      <h1>Add Employee</h1>
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
        <Button variant="primary" type="button" name="btnCreateEmployee"
          id="btnCreateEmployee"
          onClick={() => validate()}>
          CREATE AN EMPLOYEE
        </Button>
      </Form>
    </div>
  );
}


export default EmployeeCreate;
