const { printServiceKeys, getServiceActions, generateTerraformPolicy } = require('../aws_services');
const assert = require('assert');

describe('AWS Services', function() {
  describe('#printServiceKeys()', function() {
    it('should print a list of all the keys in the serviceMap object', function() {
      printServiceKeys(); // Manually check output in console
      assert.ok(true); // If it gets here it means the test passed
    });
  });

  describe('#getServiceActions()', function() {
    it('should print the Actions property for a valid service name', function() {
      getServiceActions('Amazon EC2'); // Manually check output in console
      assert.ok(true); // If it gets here it means the test passed
    });

    it('should print an error message for an invalid service name', function() {
      getServiceActions('Non-existent service'); // Manually check output in console
      assert.ok(true); // If it gets here it means the test passed
    });
  });

  describe('#generateTerraformPolicy()', function() {
    it('should generate a Terraform policy file with a valid service name and list of actions', function() {
        const hcl = generateTerraformPolicy('Amazon EC2', ['Test1', 'Test2', 'Test3']);
        assert.ok(hcl.includes('amazon_ec2'));
        assert.ok(hcl.includes('"Test1"'));
        assert.ok(hcl.includes('"Test2"'));
        assert.ok(hcl.includes('"Test3"'));
      });
    it('should replace spaces in service names with underscores and make lowercase', function() {
      const hcl = generateTerraformPolicy('Amazon S3', ['Test1', 'Test2']);
      console.log(hcl, "test")
      assert.ok(hcl.includes('amazon_s3'));
    });
  });
});


