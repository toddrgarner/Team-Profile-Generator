const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
// const renderEmployeeCards = require("./src/generateHTML");

// an empty array where the questions will get pushed
const employeeArray = [];


const managerQuestions = () => {
    return inquirer.prompt([{
        
    }])

   
}


const employeeQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What is this employee's role?",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "Enter employee name",
      },
      {
        type: "input",
        name: "id",
        message: "Enter employee id",
      },
      {
        type: "input",
        name: "email",
        message: "Enter employee email address",
        validate: function (input) {
          {
            // Regex mail check (return true if valid mail)
            validEmail =
              /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
                input
              );

            if (validEmail) {
              return true;
            } else {
              console.log(" --- Please enter a valid email address ---");
              return false;
            }
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter manager's office number",
      },
      {
        type: "input",
        name: "github",
        message: "Enter engineer github",
        when: (input) => input.role === "Engineer",
      },
      {
        type: "input",
        name: "intern",
        message: "Enter intern school",
        when: (input) => input.role === "Intern",
      },

      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "do you want to add another employee?",
        default: false,
      },
    ])
    .then((employeeData) => {
      const { name, id, email, role, github, school, confirmAddEmployee } =
        employeeData;
      let employee;
      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);
        console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);
        console.log(employee);
      }
      employeeArray.push(employee);
      if (confirmAddEmployee) {
        return employeeQuestions(employeeArray);
      } else {
        return employeeArray;
      }
    });
};
employeeQuestions();

//const manager = new Manager(name, id, email, officeNumber);
//employeeArray.push(manager)
//console.log(employeeArray)

// // function to create html file for team
// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, (err) =>
//         (err) ? console.log("error") : console.log("HTML File Generated")
//     )
// }

// // Function call to initialize app
// init()
