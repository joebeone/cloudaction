
const fs = require('fs');

// Reads the configuration file and parse the JSON object
const configStr = fs.readFileSync('./aws_config/policy.json', 'utf8');
const configObj = JSON.parse(configStr);

// Function prints a list of all the keys in the serviceMap object
function printServiceKeys() {
  console.log('Service keys:');
  for (const key in configObj.serviceMap) {
    console.log('-', key);
  }
  console.log("\n");
}

// function gets the Actions property for a service name
function getServiceActions(serviceName) {
    if (configObj.serviceMap.hasOwnProperty(serviceName)) {
        for (const action of configObj.serviceMap[serviceName].Actions) {
            console.log(`"${action}"`);
        }
        console.log(`\n\nTotal Count for ${serviceName} is ${configObj.serviceMap[serviceName].Actions.length}\n`)
    } else {
        console.log(`Service '${serviceName}' not found.`);
    }
}

function generateTerraformPolicy(serviceName, actions){
    const date = new Date();
    const timestamp = date.toISOString();
  
    serviceName = serviceName.replace(/ /g, '_').toLowerCase();
  
    const fileName = `policy_${serviceName}_${timestamp.slice(0, 10)}.tf`;
  
    const statement = {
      Effect: 'Allow',
      Action: actions,
      Resource: ['*']
    };
  
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [statement]
    };
  
    const dataBlock = `# Generated on ${timestamp}
  data "aws_iam_policy_document" "${serviceName}" {
    statement = ${JSON.stringify(policyDocument, null, 2)}
    condition {}
  }
  
  
  resource "aws_iam_policy" "${serviceName}" {
    name   = "${serviceName}"
    policy = data.aws_iam_policy_document.${serviceName}.json
  }`;
  
    return dataBlock;
  };

  
  
// Export the functions so they can be used in other files
module.exports = {
  printServiceKeys,
  getServiceActions,
  generateTerraformPolicy
};
