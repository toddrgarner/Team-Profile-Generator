const managersCard = manager => {
    return `<div class="col-4 mt-4">
    <div class="card h-100">
        <div class="card-header">
            <h3>${manager.name}</h3>
            <h4>Manager</h4><i class="material-icons">groups</i>
        </div>
        <div class="card-body">
            <p class="id">ID: ${manager.id}</p>
            <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
            <p class="office">Office Number: ${manager.officeNum}</p>
        </div>node 
    </div>
</div>`
}


const engineersCard = engineer => {
    return `<div class="col-4 mt-4">
    <div class="card h-100">
        <div class="card-header">
            <h3>${engineer.name}</h3>
            <h4>Engineer</h4><i class="material-icons">groups</i>
        </div>
        <div class="card-body">
            <p class="id">ID: ${engineer.id}</p>
            <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
            <p class="office">Github: ${engineer.github}</p>
        </div>
    </div>
</div>`
}

const internsCard = intern => {
    return `<div class="col-4 mt-4">
    <div class="card h-100">
        <div class="card-header">
            <h3>${intern.name}</h3>
            <h4>Intern</h4><i class="material-icons">groups</i>
        </div>
        <div class="card-body">
            <p class="id">ID: ${intern.id}</p>
            <p class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
            <p class="office">School: ${intern.school}</p>
        </div>
    </div>
</div>`
}

const generateHTML = function(data) {
    pageArray = [];
    for (let i = 0; i < data.length; i++) {
        const employee = data[i];
        const role = employee.getRole();

        // Calling managersCard
        if (role === 'Manager') {
            const managerCard = managersCard(employee);
            pageArray.push(managerCard);
        }

        // Calling engineersCard
        if (role === 'Engineer') {
            const engineerCard = engineersCard(employee);
            pageArray.push(engineerCard);
        }

        // Calling internsCard 
        if (role === 'Intern') {
            const internCard = internsCard(employee);
            pageArray.push(internCard);
        }

    }
    const employeeCards = pageArray.join('')
    const generateTeam = renderEmployeeCards(employeeCards);
    return generateTeam;
};

const renderEmployeeCards = function(employeeCards) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Team Profile Generator</title>
      </head>
      <body>
      

    ${employeeCards}

    <!-- Links -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script src="./assets/js/script.js"></script>

      </body>
    </html>`
}  

module.exports = generateHTML;

