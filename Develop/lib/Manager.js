// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require( './Employee' )

class Manager extends Employee {
    constructor( name, id, email, office ){
        // pass on constructor to the class we are extending
        super( name, id, email, 'Manager' )
        this.office = office // *HINT* this property name needs changing to pass the JEST test...
    }
    getOfficeNumber(){
        return this.office
    }
}

module.exports = Manager