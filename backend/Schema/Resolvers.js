require('../models/db');
const moment = require('moment');
const Employee = require('../models/employees');

/**
 * Resolvers needs to write 2 things:
 * Firstly, Query - which should be writen for Query mentioned in TypeDefs
 * Secondly, Mutation - It has the definition of the CRUD method which is mentioned in the mutation of TypeDefs
 */

const resolvers = {
    Query: {
        async getAllEmployees() {
            return await Employee.find({});
        },
        async getEmployee(parent, {_id}) {
            const result = await Employee.findById(_id);
            const differenceRetiredAge = 65 - result.Age;
            const dateOfRetired = moment(result.DateOfJoining).add(differenceRetiredAge,'Y').format("MM-DD-YYYY");
            
            var retiredDate = moment(dateOfRetired);
            var currentDate = moment( moment().format('MM-DD-YYYY'));
            var dateDifference = retiredDate.diff(currentDate, 'days');


            let remainingYear = Math.round(dateDifference/365);
            let remainingMonths = Math.round((dateDifference - (remainingYear*365))/30);
            let remainingDays  =   Math.round(dateDifference - (remainingYear*365) - (remainingMonths*30));
            
            result.name = "HJK";
            result.remainingYears = remainingYear;
            result.remainingMonths = remainingMonths;
            result.remainingDays = remainingDays;

            return result;
        },
        async getFilteredEmployee(parent, {input}) {
            if(input.data) {
                return await Employee.find({ $or: [{'FirstName': input.data},{'LastName': input.data},{'EmployeeType': input.data}] });
            } else {
                return await Employee.find({});
            }
        },
        async getUpcomingRetiredEmployee() {
            return await Employee.find({ $and: [{'Age' : { $gte: 64}}, {'CurrentStatus': true}] });
        },
        async getUpcomingRetiredFilteredEmployee(parent, {input}) {
            if(input.data) {
                const result =  await Employee.find({ $and: [{'Age': { $gte: 64}},{'CurrentStatus': true},{'EmployeeType': input.data}] });
                return result;
            } else {
                return await Employee.find({});
            }
        },
    },

    Mutation: {
        async createEmployee(parent, args) {
            const newEmployee = args;
            const employee = new Employee(newEmployee);
            return await employee.save();
        },
        async updateEmployee(parent, { _id, input }) {
            return await Employee.findOneAndUpdate({ _id }, input, { new: true } ) 
        },
        async deleteEmployee(parent, { _id }) {
            //it will delete employee if it's retired or it return null
            return await Employee.findOneAndDelete({ _id: _id, CurrentStatus: false});
        }
    }

};

module.exports = { resolvers };