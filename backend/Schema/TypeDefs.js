const {gql} = require('apollo-server-express');

/* 
    Typedefs mention three things:
    Firstly, Type is define the type definition of the Employee Type
    Secondly, Query is define the queries which required for that we need to write resolver
    Thirdly, Mutation is used to write CRUD functions prototype
*/
const typeDefs = `
    scalar Date

    type Employee {
        _id: ID
        FirstName: String!
        LastName: String!
        Age: Int!
        DateOfJoining: Date!
        Title: String!
        Department: String!
        EmployeeType: String!
        CurrentStatus: Boolean!
    }

    # Queries - Mention all queries which we required
    type Query {
        getAllEmployees: [Employee!]
        getEmployee(_id: ID): Employee
        getFilteredEmployee(input: searchDetail): [Employee!]
        getUpcomingRetiredEmployee: [Employee!]
        getUpcomingRetiredFilteredEmployee(input: searchDetail): [Employee!]
    }

    input searchDetail {
        data: String!
    }
    

    input EmployeeInput {
        FirstName: String!
        LastName: String!
        Age: Int!
        DateOfJoining: Date!
        Title: String!
        Department: String!
        EmployeeType: String!
        CurrentStatus: Boolean!
    }

    # Mutations
    type Mutation {
      createEmployee(FirstName: String!, LastName: String!, Age: Int!, DateOfJoining: Date!,
        Title: String!, Department: String!, EmployeeType: String!, CurrentStatus: Boolean!): Employee!
      updateEmployee(_id: ID!, input: EmployeeInput): Employee
      deleteEmployee(_id: ID!): Employee
    }
`; 

module.exports = { typeDefs };