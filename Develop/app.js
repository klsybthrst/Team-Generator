const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let userList = []
let userId = 1

async function main(){
    const managerInfo = await inquirer.prompt([
        {
            name: "name",
            message: "What is the manager's Name?"
        },
        {
            name: "email",
            message: "What is the manager's Email?"
        },
        {
            name: "office",
            message: "What is the manager's OfficeNumber?"
        },
        {
            name: "teamMembers",
            message: "How many members in your team?"
        }]
    )

    const manager = new Manager( managerInfo.name, userId++, managerInfo.email, managerInfo.office )
    userList.push( manager )
    for( var i=0; i<managerInfo.teamMembers; i++ ){
        let employeeType = await inquirer.prompt([
            {
              type: "list",
              name: "type",
              message: "Employee type to add?",
              choices: [
                "Engineer",
                "Intern"
              ]
            } ] )
        employeeType = employeeType.type

        const employeeInfo = await inquirer.prompt([
            {
                name: "name",
                message: `What is the ${employeeType}'s Name?`
            },
            {
                name: "email",
                message: `What is the ${employeeType}'s Email?`
            },            
            {
                name: "info", 
                message: `What is the ${employeeType}'s ${employeeType=='Engineer' ? 'GitHub' : 'School'}?`
            } ])

        const employee = employeeType==='Engineer' 
            ? new Engineer( employeeInfo.name, userId++, employeeInfo.email, employeeInfo.info )
            : new Intern( employeeInfo.name, userId++, employeeInfo.email, employeeInfo.info )
        userList.push( employee )
    }

    if( !fs.existsSync(OUTPUT_DIR) ) fs.mkdirSync(OUTPUT_DIR)
    fs.writeFileSync(outputPath, render(userList), "utf-8");

    console.log( `Completed writing to: ${outputPath}` )
}
main()