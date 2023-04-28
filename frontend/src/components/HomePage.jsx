import React from 'react'
import { Table } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div className=" mt-4 container">
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
        <tbody>
          <tr>
            <td>Developer Name </td>
            <td>Mayurkumar Malaviya(8789010), Hitkumar Savaliya(8804951), Parth Jasoliya(8804515)</td>
          </tr>
          <tr>
            <td>Course code</td>
            <td>PROG8730 </td>
          </tr>
          <tr>
            <td>Section & Group</td>
            <td>SECTION-1-GROUP-3</td>
          </tr>
          <tr>
            <td>Course Title</td>
            <td>Advanced Full-Stack Programming </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>mmalaviya9010@conestogac.on.ca</td>
          </tr>
          <tr>
            <td>Lead by</td>
            <td>Mayurkumar Malaviya</td>
          </tr>

          <tr>
            <td>Guided by</td>
            <td>Tushar Upadhyay</td>
          </tr>
          <tr>
            <td>
              Features
            </td>
            <td>
              I have used routing,hooks, context provider to pass global data to the hierarchy components
            </td>
          </tr>
          <tr>
            <td>
              Functionality:
            </td>
            <td>
              CRUD operations with routing and Search employees functionality
            </td>
          </tr>
          <tr>
            <td>
              Used technologies:
            </td>
            <td>
              HTML, CSS, REACT, Express, GraphQL
            </td>
          </tr>
          <tr>
            <td>
              Github:
            </td>
            <td>
              <a href="https://github.com/WebDesignDevelopmentCC/section-1-group-3" target="_blank">
              https://github.com/WebDesignDevelopmentCC/section-1-group-3
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default HomePage