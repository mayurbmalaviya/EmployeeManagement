const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    FirstName: String,
    LastName: String,
    Age: Number,
    DateOfJoining: Date,
    Title: {
        type: String,
        enum: ['Employee', 'Manager', 'Director', 'VP'],
        default: 'Employee'
    },
    Department: {
        type: String,
        enum: ['IT', 'Marketing', 'HR', 'Engineering'],
        default: 'IT'
    },
    EmployeeType: {
        type: String,
        enum: ['FullTime', 'PartTime', 'Contract', 'Seasonal'],
        default: 'FullTime'
    },
    CurrentStatus: {
        type: Boolean,
        default: true
    }
});

const Employee = mongoose.model('Employees', EmployeeSchema, "employees");
module.exports = Employee;
