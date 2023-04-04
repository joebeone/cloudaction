
const fs = require('fs');
const readline = require('readline');
const { printServiceKeys, generateTerraformPolicy, getServiceActions } = require('./aws_services');
const { sortResourcesInDirectory } = require('./terraform_standardize.js');

// Read the configuration file and parse the JSON object
const configStr = fs.readFileSync('./aws_config/policy.json', 'utf8');

// Define a function to prompt the user for a service name and print its Actions property
function printServiceActions() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter service name: ', (serviceName) => {
        getServiceActions(serviceName);
        rl.close();
        displayMenu();
    });
}

// Define a function to prompt the user for a service name and a list of actions, and generate a Terraform policy file
function createHclPolicy() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let serviceName = '';
    let actions = [];

    const askServiceName = () => {
        rl.question('Enter service name: ', (service) => {
            serviceName = service.trim();
            askActions();
        });
    };

    const askActions = () => {
        rl.question('Enter actions (comma-separated): ', (line) => {
            actions = line.split(',').map((action) => action.trim());
            const hcl = generateTerraformPolicy(serviceName, actions);

            const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
            const fileName = `policy_${serviceName.replace(/ /g, '')}_${timestamp}.tf`;

            fs.writeFile(fileName, hcl, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`HCL policy file created: ${fileName}`);
                }

                rl.close();
                displayMenu();
            });
        });
    };

    askServiceName();
}

// Define a function to prompt a user for a terraform project directory and then sort and then sort the resource and modules in each file from least dependent to most dependent.
function sortHclFiles() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter path to terraform project directory: ', (path) => {
        sortResourcesInDirectory(path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('HCL policy files sorted successfully.');
        }
  
        displayMenu();
      });
    });
  }

//Header
function printHeader() {
    console.log('---------------------------------------');
    console.log('            CLOUD ACTIONS              ');
    console.log('  A few tools for automating IaC work  ');
    console.log('---------------------------------------');
    console.log('\n');
  }

// Define a function to display the main menu and handle user input
function displayMenu() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    console.log('Select an option:');
    console.log('1. List all services');
    console.log('2. View actions for a service');
    console.log('3. Create an HCL policy file');
    console.log('4. Sort HCL policy files');
    console.log('5. Exit');

    rl.question('Option: ', (option) => {
        switch (option) {
            case '1':
                printServiceKeys();
                displayMenu();
                break;
            case '2':
                printServiceActions();
                break;
            case '3':
                createHclPolicy();
                break;
            case '4':
                sortHclFiles();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log(`Invalid option: ${option}`);
                displayMenu();
                break;
        }
    });
}

// Display header
printHeader();
// Display the main menu
displayMenu();

