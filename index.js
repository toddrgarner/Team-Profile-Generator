const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const generateHTML = require("./src/generateHTML.js");
const { type } = require("os");
const employeeArray = [];

// an empty array where the questions will get pushed

const managerQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "input ",
        name: "name",
        message: "Enter manager's name",
      },
      {
        type: "input",
        name: "id",
        message: "Enter manager's id",
      },
      {
        type: "input ",
        name: "email",
        message: "Enter manager's email",
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
        message: "Enter manager's office Number",
      },
    ])

    .then((managerData) => {
      const { name, id, email, officeNumber } = managerData;
      const manager = new Manager(name, id, email, officeNumber);
      employeeArray.push(manager);
      console.log(manager);
    });
};

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
        name: "github",
        message: "Enter engineer github username",
        when: (input) => input.role === "Engineer",
      },

      {
        type: "input",
        name: "school",
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
// employeeQuestions();

// const manager = new Manager(name, id, email, officeNumber);
// employeeArray.push(manager)
// console.log(employeeArray)

// writeToFile("./src/generateHTML", renderEmployeeCards(employeeArray))

// function renderEmployeeCards(employeeArray) {
//   const answerArray = employeeArray;

// function to create html file for team
const writeToFile = data => {
  fs.writeFile("./dist/index.html", data, (err) =>
    err ? console.log("error") : console.log("HTML File Generated")
  );
}

// const emply
//writeToFile("./dist/index.html", renderEmployeeCards);

managerQuestions()
  .then(employeeQuestions).then(employeeArray => {
    return generateHTML(employeeArray);
    })
    .then(pageHTML => {
      return writeToFile(pageHTML)
    })
    .catch(err => {
      console.log(err)
    })




