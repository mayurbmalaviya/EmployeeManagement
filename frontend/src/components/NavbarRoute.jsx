import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom'
import EmployeeCreate from './EmployeeCreate'
import EmployeeList from './EmployeeList'
import EmployeeUpdate from './EmployeeUpdate';
import EmployeeDetail from './EmployeeDetail';
import HomePage from './HomePage';
import UpcomingRetiredEmployeeList from './UpcomingRetiredEmployeeList';
import UpcomingRetiredEmployeeSearchList from './UpcomingRetiredEmployeeSearchList';
import { Navbar, Container, Nav } from 'react-bootstrap';
import EmployeeSearch from './EmployeeSearch'
import { useLocation } from 'react-router-dom';

const NavbarRoute = () => {
  let location = useLocation();
  let upcoming = /upcomingretired/.test(location.pathname)
  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="/">
            Employee Management
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/list"> Employee List</Nav.Link>
            <Nav.Link href="/add">Add Employee</Nav.Link>
            <Nav.Link href="/upcomingretired"> Upcoming Retirement</Nav.Link>
            {!upcoming ? (
              <EmployeeSearch />
            ) : (<UpcomingRetiredEmployeeSearchList />)}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/list" element={<EmployeeList />} />
        <Route exact path="/upcomingretired" element={<UpcomingRetiredEmployeeList />} />
        <Route exact path="/add" element={<EmployeeCreate />} />
        <Route exact path="/edit/:id" element={<EmployeeUpdate />} />
        <Route exact path="/view/:id" element={<EmployeeDetail />} />
      </Routes>
    </>
  )
}

export default NavbarRoute